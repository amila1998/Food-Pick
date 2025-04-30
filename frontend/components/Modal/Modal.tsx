"use client";

import React from "react";
import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../Button/Button";
import { createPortal } from "react-dom";

type WidthSize = "sm" | "md" | "lg";

interface ModalProps {
  isViewMode?: boolean;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  children: React.ReactNode;
  width?: WidthSize;
  submitLabel?: string;
  showFooter?: boolean;
}

const widthClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-2xl",
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, y: -30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 20, scale: 0.95 },
};

const Modal: React.FC<ModalProps> = ({
  isViewMode=false,
  isOpen,
  onClose,
  onSubmit,
  title = "Modal Title",
  children,
  width = "md",
  submitLabel = "Submit",
  showFooter = true,
}) => {
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed top-0 z-1000 left-0 w-full h-full bg-body_light_fade dark:bg-body_dark backdrop-blur-sm flex justify-center items-center px-4"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={backdropVariants}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={`relative bg-body_light dark:bg-body_dark rounded-lg shadow-xl w-full ${widthClasses[width]}`}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
              <h3 className="text-lg font-semibold text-black dark:text-white">
                {title}
              </h3>
              <button
                type="button"
                onClick={()=>onClose()}
                className="text-gray-400 hover:text-danger  p-2 rounded-full"
              >
                X
              </button>
            </div>
  
            {/* Body */}
            <div className="p-4">
              {children}
  
              {/* Footer */}
              {showFooter && (
                <div className="flex justify-end mt-4 gap-2">
                  <Button
                    type="outlined"
                    label="Cancel"
                    onClick={onClose}
                    color="primary"
                  />
                 {!isViewMode && <Button
                    type="filled"
                    label={submitLabel}
                    onClick={()=>onSubmit()}
                    color="primary"
                  />}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body // ✅ COMMA makes this a valid call
  );
};

export default Modal;
