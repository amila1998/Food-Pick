import React from "react";
import { motion } from "framer-motion";
import { IoMdStar } from "react-icons/io";

interface RatingProps {
  rating: number;
  maxStars?: number;
  size?: "sm" | "md" | "lg";
  color?: string;
  inactiveColor?: string;
  onChange?: (rating: number) => void;
}

const sizeClasses = {
  sm: "text-sm w-4 h-4",
  md: "text-md w-6 h-6",
  lg: "text-lg w-8 h-8",
};

const Rating: React.FC<RatingProps> = ({
  rating,
  maxStars = 5,
  size = "md",
  color = "text-primary",
  inactiveColor = "text-gray-300",
  onChange,
}) => {
  return (
    <div className="flex space-x-1">
      {Array.from({ length: maxStars }, (_, index) => {
        const starValue = index + 1;
        return (
          <motion.button
            key={index}
            onClick={() => onChange && onChange(starValue)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className={`transition-transform ${
              starValue <= rating ? color : inactiveColor
            } ${sizeClasses[size]}`}
          >
            <IoMdStar />
          </motion.button>
        );
      })}
    </div>
  );
};

export default Rating;
