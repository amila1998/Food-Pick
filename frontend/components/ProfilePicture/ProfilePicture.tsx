'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { FaCamera } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

interface ProfilePictureProps {
  src: string;
  alt?: string;
  editable?: boolean;
  size?: number;
  onChange?: (file: File) => void;
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({
  src,
  alt = 'Profile Picture',
  editable = false,
  size = 120,
  onChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(src);

  const handleImageClick = () => {
    if (editable && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);

      if (onChange) {
        onChange(file);
      }
    }
  };

  return (
    <motion.div
      className="relative inline-block"
      whileHover={editable ? { scale: 1.02 } : {}}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      <div
        className={`rounded-full overflow-hidden border-4 border-white shadow-md ${
          editable ? 'cursor-pointer' : 'cursor-default'
        }`}
        onClick={handleImageClick}
        style={{ width: size, height: size }}
      >
        <motion.div
          key={previewUrl}
          initial={{ opacity: 0.3, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src={previewUrl || '/assets/default-avatar-icon.jpg'}
            alt={alt}
            width={size}
            height={size}
            className="object-cover w-full h-full"
          />
        </motion.div>
      </div>

      {/* Camera icon animation */}
      <AnimatePresence>
        {editable && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-0 right-0 bg-primary text-white p-1 rounded-full cursor-pointer shadow-md"
          >
            <FaCamera size={16} />
          </motion.div>
        )}
      </AnimatePresence>

      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    </motion.div>
  );
};

export default ProfilePicture;
