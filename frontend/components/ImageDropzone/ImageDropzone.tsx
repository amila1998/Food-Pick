"use client";

import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FaUpload } from "react-icons/fa";
import Image from "next/image";
import { motion } from 'framer-motion';

interface ImageDropzoneProps {
  onFileAccepted: (file: File) => void;
  previewUrl?: string;
  maxSizeInMB?: number;
  accept?: string[];
  label?: string;
  error?: string;
}

const ImageDropzone: React.FC<ImageDropzoneProps> = ({
  onFileAccepted,
  previewUrl,
  maxSizeInMB = 5,
  accept = ["image/jpeg", "image/png", "image/webp"],
  label = "",
  error = "",
}) => {
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileAccepted(acceptedFiles[0]);
    }
  }, [onFileAccepted]);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    fileRejections,
  } = useDropzone({
    onDrop,
    multiple: false,
    accept: Object.fromEntries(accept.map(type => [type, []])),
    maxSize: maxSizeInBytes,
  });

  return (
    <div className="w-full">
      {label && <p className={`mb-2 text-sm font-medium ${error ? 'text-danger' : 'text-black dark:text-white'}`}>{label}</p>}


      <motion.div
        className="relative mt-2 w-full"
        animate={
          error
            ? {
              x: [0, -6, 6, -6, 6, 0], // Shake on error
            }
            : {}
        }
        transition={{ duration: 0.4 }}
      >
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-4 flex bg-gray-100 dark:bg-gray-800 flex-col items-center justify-center text-center cursor-pointer transition-all 
          ${isDragActive ? "border-success bg-blue-50 dark:bg-blue-900/20" : "border-gray-300 dark:border-gray-600"}
          ${(isDragReject || error) ? "border-danger" : ""}
        `}
        >
          <input {...getInputProps()} />
          {previewUrl ? (
            <Image
              src={previewUrl}
              alt="Preview"
              width={120}
              height={120}
              className="object-cover mb-3 shadow"
            />
          ) : (
            <FaUpload className="text-2xl text-primary mb-2" />
          )}

          <p className="text-gray-500 dark:text-gray-400 text-sm">
            {isDragActive
              ? "Drop the image here ..."
              : "Drag & drop or click to upload (JPG, PNG, WEBP)"}
          </p>
          <p className="text-xs text-gray-400 mt-1">Max size: {maxSizeInMB}MB</p>
        </div>
      </motion.div>

      {fileRejections.length > 0 && (
        <p className="text-sm text-red-500 mt-2">
          File rejected: Please upload a valid image under {maxSizeInMB}MB.
        </p>
      )}
      {error && (
        <motion.label
          htmlFor={'image_upload_error'}
          className="block text-xs text-left font-medium text-danger ml-4 mt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {error}
        </motion.label>
      )}
    </div>
  );
};

export default ImageDropzone;
