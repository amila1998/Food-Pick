'use client';

import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { motion } from 'framer-motion';

interface InputProps {
  id: string;
  name: string;
  label?: string;
  type: string;
  value: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isDisable?: boolean;
  isRequired?: boolean;
  placeholder?: string;
  error?: string;
  iconLeft?: IconProp | undefined;
  iconRight?: IconProp | undefined;
  iconLeftTitle?: string;
  iconRightTitle?: string;
  onClickRightIcon?: () => any;
  onClickLeftIcon?: () => any;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      name,
      label,
      type = 'text',
      onChange,
      isDisable = false,
      isRequired = false,
      placeholder,
      error,
      iconLeft,
      iconLeftTitle,
      iconRight,
      iconRightTitle,
      onClickRightIcon,
      onClickLeftIcon,
      value,
    },
    ref
  ) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {label && (
          <label
            htmlFor={name}
            className={`block text-sm text-left font-medium ${
              error ? 'text-danger' : 'text-black dark:text-white'
            }`}
          >
            {label}
            {isRequired ? ' *' : ''}
          </label>
        )}

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
          {iconLeft && (
            <FontAwesomeIcon
              title={iconLeftTitle}
              icon={iconLeft}
              className={`w-5 h-5 absolute top-1/2 right-3 -translate-y-1/2 text-black dark:text-white ${
                onClickLeftIcon ? 'cursor-pointer' : 'pointer-events-none'
              }`}
              aria-label={iconLeftTitle || "icon action"}
              role={onClickLeftIcon ? "button" : undefined}
              onClick={() => onClickLeftIcon?.()}
            />
          )}

          <input
            ref={ref}
            type={type}
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={isDisable}
            required={isRequired}
            className={`mt-1 block w-full p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-black dark:text-white focus:ring-2 focus:ring-primary focus:outline-none focus:border-primary transition-all duration-200 ${
              iconRight ? 'pr-10' : ''
            } ${iconLeft ? 'pl-10' : ''} ${
              error ? 'border border-danger ring-danger' : ''
            }`}
          />

          {iconRight && (
            <FontAwesomeIcon
              icon={iconRight}
              className={`w-5 h-5 absolute top-1/2 right-3 -translate-y-1/2 text-black dark:text-white ${
                onClickRightIcon ? 'cursor-pointer' : 'pointer-events-none'
              }`}
              title={iconRightTitle}
              aria-label={iconRightTitle || "icon action"}
              role={onClickRightIcon ? "button" : undefined}
              onClick={() => onClickRightIcon?.()}
            />
          )}
        </motion.div>

        {error && (
          <motion.label
            htmlFor={name + '_error'}
            className="block text-xs text-left font-medium text-danger ml-4 mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.label>
        )}
      </motion.div>
    );
  }
);

Input.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any,
  isDisable: PropTypes.bool,
  isRequired: PropTypes.bool,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  iconLeft: PropTypes.object as PropTypes.Validator<IconProp>,
  iconRight: PropTypes.object as PropTypes.Validator<IconProp>,
  onClickRightIcon: PropTypes.func,
  onClickLeftIcon: PropTypes.func,
};

Input.displayName = 'Input';

export default Input;
