"use client"

import { addtoCart } from '@/actions/cart'
import { getAllItems, getAllItemsOwn } from '@/actions/item'
import Button from '@/components/Button/Button'
import Loader from '@/components/Loader/Loader'
import { useAppDispatch } from '@/lib/hooks'
import getCurrency from '@/utils/getCurrencey'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const HomePage:React.FC = () => {
    const [items,setItems] = useState<any>([])
    const [isLoading,setIsLoading] = useState<boolean>(false)
    const dispatch = useAppDispatch()

    useEffect(() => {
        fetchAllItems()
    },[])


    const fetchAllItems = async () => {
        try {
            setIsLoading(true)
            const res = await dispatch(getAllItems())
            setItems(res)
        } catch (error: any) {
            toast.error(error)
            
        }finally{
            setIsLoading(false)
        }
    }

    const addCart = async (item:any) => {
        console.log("🚀 ~ addCart ~ item:", item)
        try {
            await dispatch(addtoCart(item))
        } catch (error: any) {
            toast.error(error)
            
        }finally{
        }
    }
  return (
    <>
    {isLoading && <Loader/>}
    {
        items && items.length > 0 ?     <div className="w-full h-[75vh] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center items-cente text-black dark:text-white">
        {
             items.map((item:any,index:number) => (
                <div key={index} className="w-full overflow-hidden h-[330px] sm:h-[330px] md:h-[330px] lg:h-[330px] bg-gray-200 dark:bg-gray-800 rounded-lg shadow-md flex flex-col justify-center items-center p-4">
                    <img src={item.image} alt={item.name} className="w-full h-[200px] object-cover rounded-lg mb-2" />
                    <h3 className="text-lg font-bold">{item.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{Number(item.price).toFixed(2) + ` (${getCurrency("en-US", "LKR")})`}</p>
                    <div className='flex justify-between items-center w-full mt-2 p-2 mb-2'>
                        <div  />
                        <Button label="Add to Cart" onClick={() =>{addCart(item)}} type="filled" color="primary"/>
                    </div>
                </div>
            ))
        }
    </div>: <div className='w-full h-full flex justify-center items-center'>No Items Found</div>
    }

    </>
  )
}

export default HomePage