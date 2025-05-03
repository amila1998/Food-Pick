"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { use, useEffect, useState } from "react";
import Image from "next/image";
import Loader from "@/components/Loader/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  ANGLE_LEFT,
  ANGLE_RIGHT,
  DELETE_ICON,
  PAYPAL_ICON,
} from "@/utils/icons";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/Button/Button";
import getCurrency from "@/utils/getCurrencey";
import FaFaIconButton from "@/components/IconButton/FaFaIconButton";
import Input from "@/components/Input/Input";
import RadioButtonGroup from "@/components/RadioButtonGroup/RadioButtonGroup";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { removeFromCart, updateCartItem } from "@/actions/cart";
import { toast } from "react-toastify";
import { placeOrder } from "@/actions/order";

interface CheckoutPageProps {
  itemId?: string;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ itemId = "0" }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const [address, setAddress] = useState("");
  const dispatch = useAppDispatch();
  const checkoutItems = useAppSelector((state) => state.cart.data).filter(
    (i) => i.selected,
  );
  const [subTotal, setSubTotal] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const editCartItem = async (data: {
    _id: number;
    amount: number;
    selected: boolean;
    qty: number;
  }) => {
    try {
      await dispatch(updateCartItem(data));
    } catch (error: any) {
      toast.error(error);
    }
  };

  const handleCheckout = async () => {
    try {
      if(checkoutItems.length === 0){
          toast.error("No items to order")
          return
      }
      if(!address){
        toast.error("Delivery address is required")
        return
      }
      const ids = checkoutItems.map(i=>i.item._id)
      await dispatch(placeOrder({
        total:total, items:ids, deliveryAddress:address
      }))
      for(const courseId of ids){
        await dispatch(removeFromCart(courseId)) //TODO : bulk delete
    }
    toast.success("Order placed successfully")
      router.push("/")
    } catch (error: any) {
      toast.error(error);
    }
  };

  useEffect(() => {
    let subTotal = 0;
    checkoutItems.forEach((item: any) => {
      if (item.selected) {
        subTotal += item.amount * item.qty;
      }
    });
    setSubTotal(subTotal);
    setTotal(subTotal);
  }, [checkoutItems]);

  return (
    <>
      {!isClient || (isLoading && <Loader />)}
      <div className="flex w-full flex-col items-center transition-all duration-300">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid w-full max-w-6xl grid-cols-1 gap-8 md:grid-cols-[2fr_1fr]"
        >
          {/* Left Section: Details */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="min-h-[60vh] overflow-auto rounded-lg bg-body_light p-6 text-black shadow-lg dark:bg-body_dark dark:text-white"
          >
            <h2 className="mb-4 text-lg font-semibold text-black dark:text-white">
              Checkout
            </h2>

            {/* Item */}
            {checkoutItems.length > 0 ? (
              <>
                {checkoutItems.map((item: any, i:number) => (
                  <motion.div
                    key={`${item._id || "item"}-${i}`}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="flex items-center justify-between rounded-lg border bg-body_light p-4 dark:border-gray-800 dark:bg-body_dark"
                  >
                    <div className="flex items-center gap-3">
                                 <input
                        className="w-20"
                        type="number"
                        value={item.qty}
                        onChange={(e) => {
                          editCartItem({
                            _id: item.item._id,
                            amount: item.amount,
                            selected: item.selected,
                            qty: Number(e.target.value),
                          });
                        }}
                      />
                      <h4 className="text-sm font-medium text-black dark:text-white">
                        {item.item.name}
                      </h4>
                    </div>

                    <div className="text-sm font-semibold text-black dark:text-white">
                      {`${getCurrency("en-US", "LKR")} ${parseFloat(item.amount).toFixed(2)}`}
                    </div>
                    <div className="flex items-center gap-2">
                      <FaFaIconButton
                        label=""
                        icon={DELETE_ICON}
                        color="danger"
                        type="outlined"
                        onClick={() => {
                            editCartItem({
                                _id: item.item._id,
                                amount: item.amount,
                                selected: false,
                                qty: item.qty,
                              });
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </>
            ) : null}
          </motion.div>

          {/* Right Section: Checkout Summary */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="sticky top-24 max-h-[70vh] overflow-auto rounded-lg bg-body_light p-6 shadow-lg dark:bg-body_dark"
          >
            <h2 className="mb-4 text-lg font-semibold text-black dark:text-white">
              Summary
            </h2>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between">
                <h6 className="text-black dark:text-white">Total items:</h6>
                <h6 className="font-semibold text-black dark:text-white">
                  {checkoutItems.length}
                </h6>
              </div>
              <div className="flex justify-between">
                <h6 className="text-black dark:text-white">Subtotal:</h6>
                <h6 className="font-semibold text-black dark:text-white">
                  {getCurrency("en-US", "LKR")} {subTotal.toFixed(2)}
                </h6>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between">
                  <h6 className="text-lg font-semibold text-black dark:text-white">
                    Total:
                  </h6>
                  <h6 className="text-lg font-semibold text-primary">
                    {getCurrency("en-US", "LKR")} {total.toFixed(2)}
                  </h6>
                </div>
              </div>
             <div>
                <Input label="Delivery Address" type="text" onChange={(e) => { setAddress(e.target.value); } } isRequired={true} placeholder="Enter your delivery address" id={"d-ad"} name={"d_ad"} value={address} />
             </div>
              <Button
                isDisabled={checkoutItems.length === 0}
                label="Pay Now"
                onClick={() => {
                  handleCheckout();
                }}
                type="filled"
                color="primary"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default CheckoutPage;
