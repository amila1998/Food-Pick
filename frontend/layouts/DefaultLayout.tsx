"use client"
import Loader from "@/components/Loader/Loader";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { ReactNode, useEffect, useState } from "react";
import Toast from "@/components/Toast/Toast";
import { info, logout } from "@/actions/user";
import { setAuthToken } from "@/proxy/axios";
import { getCart } from "@/actions/cart";


export default function DefaultLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const token = useAppSelector((state) => state.auth.token);


  const dispatch = useAppDispatch()

  useEffect(() => {
    if(token){
      setAuthToken(token)
      getUserInfo()

    }else{
      setIsLoading(false)
      handleLogout()
    }
   
  }, [token]);


  const getUserInfo = async () => {
    try {
      await dispatch(info())
      await dispatch(getCart())
    } catch (error) {
      handleLogout()
    }finally{
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    await dispatch(logout({}))
  }


  useEffect(() => {
    setIsClient(true);
  }, []);


  return (
    <main className="w-[95%] h-full z-0 pt-5 mt-24 md:mt-20 mb-20 p-4 overflow-hidden">
      <Toast/>
      {(!isClient || isLoading) ? <Loader /> : <>
        {children}
      </>}
    </main>
  );
}