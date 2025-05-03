"use client"
import getCurrency from "@/utils/getCurrencey";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import moment from "moment";
import * as motion from "motion/react-client"
import Button from "@/components/Button/Button";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { addtoCart } from "@/actions/cart";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface ItemCardBoxProps {
  item: any,
  title: string;
  description: string;
  price: number;
  discount: number;
  lastUpdate: string;
  coverPhoto: string;
}

const ItemCardBox: React.FC<ItemCardBoxProps> = ({
  title,
  description,
  price,
  discount,
  lastUpdate,
  coverPhoto,
  item,
}) => {
 
  const router = useRouter()
  const dispatch = useAppDispatch()
  const getInstructorDetails = () => {
    try {

    } catch (error: any) {

    }
  }

  const addToCart = async () => {
    try {
      const cartItem = {
        item:item,
        amount:Number(item.price),
        selected:false
    }
      await dispatch(addtoCart(cartItem))
    } catch (error: any) {
      toast.error(error)
    }
  }

  return (
    <motion.div className="group relative text-black dark:text-white w-[260px] sm:w-[260px] md:w-[260px] h-[280px] sm:h-[300px] md:h-[320px] perspective" initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.4,
        scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
      }}>
      {/* Flip Container */}
      <div className="relative w-full h-full transition-transform duration-700 transform-style-3d group-hover:rotate-y-180">

        {/* Front Side */}
        <div className="absolute flex w-full h-full bg-body_light dark:bg-body_dark shadow-lg rounded-xl flex-col items-left justify-left backface-hidden overflow-hidden">
          {/* Course Thumbnail */}
          <div className="relative">
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_URL + coverPhoto}?t=${item.updatedAt}` || "/assets/default cover.png"}
              alt="First Course"
              width={300}
              height={140}
              className="w-full h-[120px] sm:h-[140px] md:h-[160px] rounded-t-xl object-cover"
              loading="lazy"
            />
            {/* <div className="absolute top-2 left-2 bg-yellow-400 text-white text-xs font-bold px-2 py-1 rounded-md shadow-md">
              0 ★
            </div> */}
            {discount > 0 && (
              <div className="absolute bottom-2 right-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded-md shadow-md">
                {discount}% OFF
              </div>
            )}
          </div>

          {/* Course Details */}
          <div className="p-3">
            <h2 className="text-sm sm:text-md md:text-md font-semibold line-clamp-1">{title}</h2>
            <p className="text-[8px] sm:text-[8px] text-gray-500 line-clamp-2">{description}</p>

            {/* Price & Instructor */}
            <div className="flex justify-between items-center mt-2">
              <span className={`text-sm sm:text-md font-bold ${price > 0 ? "text-blue-500" : "text-green-500"}`}>
                {price > 0 ? `${getCurrency("en-US", "LKR")} ${price.toFixed(2)}` : "Free"}
              </span>
            </div>

            <hr className="border-gray-300 my-2" />

            {/* Last Updated */}
            <p className="text-[8px] sm:text-[10px] text-gray-400 mt-2 text-right">
              Last Update: {moment(new Date(lastUpdate)).fromNow()}
            </p>
          </div>
        </div>

        {/* Back Side */}
        {/* Back Side */}
        <div className="absolute w-full h-full bg-gray-100 dark:bg-gray-800 shadow-lg rounded-xl flex flex-col p-2 border border-gray-300 rotate-y-180 backface-hidden">
          {/* Clickable area for navigation */}
          <div
            className="flex-1"
            onClick={() => router.push("/item/" + item.id)}
          >
            <div className="p-3">
              <h2 className="text-sm sm:text-md md:text-md font-semibold line-clamp-1">{title}</h2>
              <div className="min-h-35 max-h-35 overflow-auto">
                <p className="text-[8px] sm:text-[10px] text-gray-500 line-clamp-2">{description}</p>
                <ul className="text-[10px] sm:text-[10px] text-gray-600 dark:text-gray-300 px-4 line-clamp-5">
                </ul>
              </div>
            </div>
          </div>

          {/* Buttons - prevent bubbling */}
      { <div className="relative w-full m-auto p-2 flex flex-col gap-2 mt-2 z-10">
            <Button
              label="Buy Now"
              onClick={(e) => {
                e.stopPropagation();
                router.push("/checkout?itemId=" + item.id);
              }}
              type="filled"
              color="primary"
            />
            <Button
              label="Add to cart"
              onClick={(e) => {
                e.stopPropagation();
                addToCart();
              }}
              type="outlined"
              color="primary"
            />
          </div>}
        </div>
      </div>
    </motion.div>
  );
};

export default ItemCardBox;
