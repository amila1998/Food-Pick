'use client';

import React from 'react';

interface LabelProps {
  htmlFor?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  error?: boolean;
  required?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

const Label: React.FC<LabelProps> = ({
  htmlFor,
  children,
  size = 'md',
  error = false,
  required = false,
  className = '',
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`block text-sm text-left font-medium ${
        sizeClasses[size]
      } ${error ? 'text-danger' : 'text-black dark:text-white'} ${className}`}
    >
      {children}
      {required && <span className="text-danger"> *</span>}
    </label>
  );
};

export default Label;
