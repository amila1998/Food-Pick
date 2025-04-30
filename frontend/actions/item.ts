import axiosInstance, { uploadFile } from "@/proxy/axios";
import { CREATE_ITEM, DELETE_ITEM, GET_ALL_ITEMS, GET_ALL_ITEMS_OWN, UPDATE_ITEM, UPLOAD_ITEM_IMAGE } from "@/utils/apis";
import axios from "axios";

export const upload = (file:File): any => {
    return async (dispatch: any) => {
      try {
        let formData = new FormData();
        formData.append('file', file);
        
        const res = await axios.post(process.env.NEXT_PUBLIC_ITEM_URL +"/api" +  UPLOAD_ITEM_IMAGE, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
        }});
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

export const getAllItemsOwn = (): any => {
    return async (dispatch: any) => {
      try {
        const res = await axiosInstance.get(GET_ALL_ITEMS_OWN);
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

export const getAllItems = (): any => {
    return async (dispatch: any) => {
      try {
        const res = await axiosInstance.get(GET_ALL_ITEMS);
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

export const createItem = (data:any): any => {
    return async (dispatch: any) => {
      try {
        const res = await axiosInstance.post(CREATE_ITEM, {...data});
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


  export const updateItem = (data:any): any => {
    return async (dispatch: any) => {
      try {
        const res = await axiosInstance.patch(UPDATE_ITEM + data._id, {...data});
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

  export const deleteItem = (id:number): any => {
    return async (dispatch: any) => {
      try {
        const res = await axiosInstance.delete(DELETE_ITEM + id);
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