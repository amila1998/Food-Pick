"use client";
import axiosInstance, { setAuthToken, uploadFile } from "@/proxy/axios";
import { authActions } from "@/lib/store/Slice/authSlice";
import { CREATE_USER, USER_INFO, USER_LOGIN, USER_LOGOUT } from "@/utils/apis";
import { AppDispatch, persistor } from "@/lib/store/store";



export const createUser = (data: any): any => {
  return async (dispatch: any) => {
    try {
      const res = await axiosInstance.post(
        CREATE_USER,
        { ...data }
      );
      return res.data
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

export const login = (data: any): any => {
  return async (dispatch: any) => {
    try {
      const res = await axiosInstance.post(
        USER_LOGIN,
        { ...data }
      );
      await dispatch(authActions.setToken({token: res.data.token}));
      return res.data
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

export const info = (): any => {
  return async (dispatch: any) => {
    try {
      const res = await axiosInstance.get(
        USER_INFO
      );
      await dispatch(authActions.setInfo({user: res.data}));
      return res.data
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

export const logout = (p0: {}): any => {
  return async (dispatch: any) => {
    try {
      const res = await axiosInstance.post(
        USER_LOGOUT,{}
      );
      await dispatch(authActions.logout({}));
      setAuthToken("")
      return res.data
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