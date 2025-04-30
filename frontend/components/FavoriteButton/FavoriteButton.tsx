import React, { useEffect, useState } from 'react'
import * as motion from "motion/react-client";
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { addToFavorite, deleteFavorite } from '@/actions/favorite';

interface FavoriteButtonProps {
  video_id: number;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  video_id
}) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const myFavorites = useAppSelector((state) => state.favorite.data as { video_id: number }[]);
  const dispatch = useAppDispatch()

  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      if (video_id && video_id > 0) {
        setIsFavorite(await checkFavorite(video_id));
      }
    };
    fetchFavoriteStatus();
  }, [video_id, myFavorites]);

  const checkFavorite = async (videoId: number): Promise<boolean> => {
    return myFavorites.length > 0 && myFavorites.some((favorite) => favorite.video_id === videoId);
  };

  const handleFavoriteClick = async (statues :boolean) => {
    if (video_id && video_id > 0) {
      try {
        if(statues){
          await dispatch(addToFavorite(video_id));
          setIsFavorite(true);
        }else{
          await dispatch(deleteFavorite(video_id));
          setIsFavorite(false);
        }
        
      } catch (error) {
        
      }
    }
  };


  return (
    <motion.div whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }} title='favarite' className='hover:cursor-pointer '>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className={`w-8 h-8  ${isFavorite ? "text-primary" : "text-black dark:text-white"}`} onClick={() => handleFavoriteClick(!isFavorite)}>
        <path d="M2 6.342a3.375 3.375 0 0 1 6-2.088 3.375 3.375 0 0 1 5.997 2.26c-.063 2.134-1.618 3.76-2.955 4.784a14.437 14.437 0 0 1-2.676 1.61c-.02.01-.038.017-.05.022l-.014.006-.004.002h-.002a.75.75 0 0 1-.592.001h-.002l-.004-.003-.015-.006a5.528 5.528 0 0 1-.232-.107 14.395 14.395 0 0 1-2.535-1.557C3.564 10.22 1.999 8.558 1.999 6.38L2 6.342Z" />
      </svg>
    </motion.div>
  )
}

export default FavoriteButton
