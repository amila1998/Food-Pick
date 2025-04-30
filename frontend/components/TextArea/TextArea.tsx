"use client";

import React, { forwardRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface TextAreaProps {
  id: string;
  name: string;
  label?: string;
  value: any;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isDisable?: boolean;
  isRequired?: boolean;
  placeholder?: string;
  error?: string;
  iconLeft?: IconProp;
  iconRight?: IconProp;
  onClickRightIcon?: () => void;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      id,
      name,
      label,
      onChange,
      isDisable = false,
      isRequired = false,
      placeholder,
      error,
      iconLeft,
      iconRight,
      onClickRightIcon,
      value,
    },
    ref
  ) => {
    return (
      <>
        {label && (
          <label
            htmlFor={name}
            className={`block text-sm text-left font-medium ${
              error ? "text-danger" : "text-black dark:text-white"
            }`}
          >
            {label}
            {isRequired ? " *" : ""}
          </label>
        )}
        <div className="relative mt-2 w-full">
          {iconLeft && (
            <FontAwesomeIcon
              icon={iconLeft}
              className="w-5 h-5 absolute top-1/2 left-3 -translate-y-1/2 text-black dark:text-white pointer-events-none"
            />
          )}
          <textarea
            ref={ref}
            value={value}
            id={id}
            name={name}
            className={`mt-1 block w-full p-3 rounded-xl border bg-gray-100 dark:bg-gray-800 text-black dark:text-white focus:ring-primary focus:border-primary ${
              iconRight ? "pr-10" : ""
            } ${iconLeft ? "pl-10" : ""} ${
              error ? "border-danger ring-danger" : "border-gray-300"
            }`}
            placeholder={placeholder}
            required={isRequired}
            disabled={isDisable}
            onChange={onChange}
          />
          {iconRight && (
            <FontAwesomeIcon
              icon={iconRight}
              className={`w-5 h-5 absolute top-1/2 right-3 -translate-y-1/2 text-black dark:text-white ${
                onClickRightIcon ? "cursor-pointer" : "pointer-events-none"
              }`}
              onClick={onClickRightIcon}
            />
          )}
        </div>
        {error && (
          <label
            htmlFor={name + "_error"}
            className="block text-xs text-left font-medium text-danger ml-4 mt-1"
          >
            {error}
          </label>
        )}
      </>
    );
  }
);

TextArea.displayName = "TextArea";

export default TextArea;
