"use client"
import Loader from '@/components/Loader/Loader';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion";
import Image from 'next/image';
import VideoCardBox from '@/components/ItemCardBox/ItemCardBox';
import Toast from '@/components/Toast/Toast';

const MySubscriptionsPage:React.FC = () => {
   const [isClient, setIsClient] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAppDispatch();
  
    useEffect(() => {
      setIsClient(true);
    }, []);
  
    return (
      <>
        {(!isClient || isLoading) && <Loader />}
        <Toast />
  
        <div className="container min-h-[75vh] max-h-[75vh] overflow-auto">
          <div className="flex flex-col justify-center items-center">
            
            
          </div>
        </div>
      </>
  )
}

export default MySubscriptionsPage
