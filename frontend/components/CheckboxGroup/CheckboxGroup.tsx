"use client";

import React from "react";

interface CheckboxOption {
  label: string;
  value: string | number ;
  disabled?: boolean;
}

interface CheckboxGroupProps {
  options: CheckboxOption[];
  selectedValues: Array<string | number>;
  onChange: (selected: Array<string | number>) => void;
  label?: string;
  direction?: "row" | "column";
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  options,
  selectedValues,
  onChange,
  label,
  direction = "column",
}) => {
  const handleToggle = (value: string | number) => {
    const isSelected = selectedValues.includes(value);
    const updated = isSelected
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];
    onChange(updated);
  };

  return (
    <div>
      {label && <label className="text-sm font-medium mb-1 block text-black dark:text-white">{label}</label>}
      <div className={`flex flex-${direction} gap-3`}>
        {options.map((option) => (
          <label
            key={option.value}
            className={`inline-flex items-center gap-2 text-sm cursor-pointer ${
              option.disabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <input
              type="checkbox"
              value={option.value}
              checked={selectedValues.includes(option.value)}
              onChange={() => handleToggle(option.value)}
              disabled={option.disabled}
              className="w-4 h-4 text-primary border-gray-300 rounded-sm focus:ring-primary_focus"
            />
            <span className="text-black dark:text-white">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default CheckboxGroup;
