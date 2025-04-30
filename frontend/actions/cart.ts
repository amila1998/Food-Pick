"use client";

import { cartActions } from "@/lib/store/Slice/cartSlice";
import axiosInstance from "@/proxy/axios";
import { CREATE_CART_ITEM, DELETE_CART, GET_CART, UPDATE_CART_ITEM } from "@/utils/apis";

export const getCart = (): any => {
  return async (dispatch: any) => {
    try {
      const res = await axiosInstance.get(
              GET_CART
          );
      if (res?.data?.length > 0) {
        await dispatch(cartActions.setCart(res.data.map((item: any) => ({ ...item }))));
      }
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.message) {
        throw err.response.data.message;
      } else if (
        err.message
      ) {
        throw err.message
      } else {
        throw err;
      }
    }
  };
};

export const addtoCart = (data: any): any => {
  return async (dispatch: any) => {
    try {
      await axiosInstance.post(
              CREATE_CART_ITEM,
              {item_id:data._id, amount:data.amount, qty:1,}
          );
      await dispatch(cartActions.addItem({item:data,amount:data.price, qty:1, selected:false,  }))
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.message) {
        throw err.response.data.message;
      } else if (
        err.message
      ) {
        throw err.message
      } else {
        throw err;
      }
    }
  };
};

export const removeFromCart = (id: number): any => {
  return async (dispatch: any) => {
    try {
      await axiosInstance.delete(
        DELETE_CART+id,
    ); 
    await dispatch(cartActions.removeItem(id))
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.message) {
        throw err.response.data.message;
      } else if (
        err.message
      ) {
        throw err.message
      } else {
        throw err;
      }
    }
  };
};

export const updateCartItem = (data:any): any => {
  return async (dispatch: any) => {
    try {
      await axiosInstance.patch(
        UPDATE_CART_ITEM+data._id,{amount:data.amount,selected:data.selected, qty :data.qty}
    ); 
    await dispatch(cartActions.updateCartItem(data))
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.message) {
        throw err.response.data.message;
      } else if (
        err.message
      ) {
        throw err.message
      } else {
        throw err;
      }
    }
  };
};

