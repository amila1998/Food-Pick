"use client";

import React, { forwardRef } from "react";
import PropTypes from "prop-types";

interface Option {
  label?: string;
  value?: string | number;
}

interface SelectProps {
  id: string;
  name: string;
  label?: string;
  value: string | number;
  options: Option[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  isDisabled?: boolean;
  isRequired?: boolean;
  placeholder?: string;
  error?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      id,
      name,
      label,
      value,
      options,
      onChange,
      isDisabled = false,
      isRequired = false,
      placeholder,
      error,
    },
    ref
  ) => {
    return (
      <div className="w-full ">
        {label && (
            <label
            htmlFor={id}
            className={`block text-left text-sm font-medium mb-1 ${
              error ? "text-danger" : "text-black dark:text-white"
            }`}
            >
            {label} {isRequired && "*"}
            </label>
        )}
        <select
          ref={ref}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={isRequired}
          disabled={isDisabled}
          className={`w-full p-3 rounded-full bg-gray-100 dark:bg-gray-800 text-black dark:text-white focus:ring-primary focus:border-primary ${
            error ? "border border-danger ring-danger" : "border-none"
          }`}
        >
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="text-xs text-danger mt-1 ml-2">{error}</p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

Select.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    }).isRequired,
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
  isRequired: PropTypes.bool,
  placeholder: PropTypes.string,
  error: PropTypes.string,
};

export default Select;
