"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Loader from "@/components/Loader/Loader";
import { motion } from "framer-motion";
import Button from "@/components/Button/Button";
import FaFaIconButton from "@/components/IconButton/FaFaIconButton";
import getCurrency from "@/utils/getCurrencey";
import Input from "@/components/Input/Input";
import { DELETE_ICON } from "@/utils/icons";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { toast } from "react-toastify";
import { removeFromCart, updateCartItem } from "@/actions/cart";
import RadioButtonGroup from "@/components/RadioButtonGroup/RadioButtonGroup";

const CartPage: React.FC = () => {
    const [isClient, setIsClient] = useState(false);
    const router = useRouter();
    const myCart = useAppSelector((state) => state.cart.data)
    console.log("🚀 ~ myCart:", myCart)
    const [subTotal, setSubTotal] = useState<number>(0)
    const [total, setTotal] = useState<number>(0)
    const dispatch = useAppDispatch()
    useEffect(() => {
        setIsClient(true);
    }, []);

    const removeCartItem = async (id: number) => {
        try {
            await dispatch(removeFromCart(id))
        } catch (error: any) {
            toast.error(error)
        }
    }

    const editCartItem = async (data: { _id: number, amount: number, selected: boolean, qty:number }) => {
        try {

            await dispatch(updateCartItem(data))

        } catch (error: any) {
            toast.error(error)
        }
    }

    useEffect(() => {
        let subTotal = 0
        myCart.forEach((item: any) => {
            if (item.selected) {
                subTotal += item.amount * item.qty
            }
        })
        setSubTotal(subTotal)
        setTotal(subTotal)
    }, [myCart])



    return (
        <>
            {!isClient && <Loader />}
            <div className="flex flex-col items-center w-full transition-all duration-300">
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8 max-w-6xl w-full"
                >
                    {/* Left Section: Details */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="bg-body_light dark:bg-body_dark text-black dark:text-white rounded-lg shadow-lg p-6 min-h-[60vh] overflow-auto"
                    >
                        <h2 className="text-lg font-semibold mb-4 text-black dark:text-white">My Cart</h2>

                        {/* Item */}
                        {
                            myCart.length > 0 ? myCart.map((item:any, i:number) => <>
                                <motion.div
                                    key={`${item._id || 'item'}-${i}`}
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    className="flex items-center justify-between border dark:border-gray-800 p-4 rounded-lg bg-body_light dark:bg-body_dark"
                                >
                                    <div className="flex items-center gap-3">
                                        <input
                                            id="link-checkbox"
                                            type="checkbox"
                                            className="w-4 h-4 text-primary border-gray-300 rounded-sm focus:ring-primary_focus"
                                            checked={item.selected}
                                            onChange={(e) => {
                                                editCartItem({ _id: item.item._id, amount: item.amount, selected: e.target.checked, qty:item.qty })
                                            }}
                                        />
                                        <input className="w-20" type="number" value={item.qty} onChange={(e)=>{
                                            editCartItem({ _id: item.item._id, amount: item.amount, selected: item.selected, qty:Number(e.target.value) })

                                        }}/>
                                        <h4 className="text-black dark:text-white text-sm font-medium">
                                            {item.item.name}
                                        </h4>
                                    </div>

                                    
                                    <div className="text-black dark:text-white text-sm font-semibold">
                                        {`${getCurrency("en-US", "LKR")} ${parseFloat(item.amount).toFixed(2)}`}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FaFaIconButton
                                            label=""
                                            icon={DELETE_ICON}
                                            color="danger"
                                            type="outlined"
                                            onClick={() => { removeCartItem(item.item._id) }}
                                        />
                                    </div>
                                </motion.div>
                            </>) : null
                        }
                    </motion.div>

                    {/* Right Section: Checkout Summary */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="bg-body_light dark:bg-body_dark rounded-lg shadow-lg p-6 sticky top-24 max-h-[70vh] overflow-auto"
                    >
                        <h2 className="text-lg font-semibold mb-4 text-black dark:text-white">Summary</h2>
                        <div className="flex flex-col gap-4">
                            <div className="flex justify-between">
                                <h6 className="text-black dark:text-white">Total Items:</h6>
                                <h6 className="text-black dark:text-white font-semibold">
                                    {`${myCart.filter(i => i.selected).length} of ${myCart.length}`}
                                </h6>
                            </div>
                            <div className="flex justify-between">
                                <h6 className="text-black dark:text-white">Subtotal:</h6>
                                <h6 className="text-black dark:text-white font-semibold">
                                    {getCurrency("en-US", "LKR")} {subTotal.toFixed(2)}
                                </h6>
                            </div>
                            <div className="flex justify-between">
                                <h6 className="text-black dark:text-white">Discount:</h6>
                                <h6 className="text-black dark:text-white font-semibold">
                                    {getCurrency("en-US", "LKR")} 0.00
                                </h6>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h6 className="text-black dark:text-white">
                                    Have a coupon?
                                </h6>
                                <div className="flex items-center gap-2">
                                    <Input
                                        value=""
                                        placeholder="Enter Coupon Code"
                                        id="coupon"
                                        name="coupon"
                                        onChange={() => { }}
                                        type="text"
                                    />
                                    <Button label="Apply" onClick={() => { }} type="outlined" />
                                </div>
                            </div>
                            <div className="border-t pt-4">
                                <div className="flex justify-between">
                                    <h6 className="text-lg font-semibold text-black dark:text-white">Total:</h6>
                                    <h6 className="text-lg font-semibold text-primary">
                                        {getCurrency("en-US", "LKR")} {total.toFixed(2)}
                                    </h6>
                                </div>
                            </div>
                            <Button
                                isDisabled={myCart.filter(i => i.selected).length === 0}
                                label="Proceed to Checkout"
                                onClick={() => { router.push("/checkout") }}
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

export default CartPage;
