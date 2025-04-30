import axiosInstance from "@/proxy/axios";
import { CREATE_ORDER } from "@/utils/apis";

export const placeOrder = (data:any): any => {
    return async (dispatch: any) => {
      try {
        const res = await axiosInstance.post(CREATE_ORDER, {...data});
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