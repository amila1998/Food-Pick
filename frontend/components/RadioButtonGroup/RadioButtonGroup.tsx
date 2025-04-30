import React from "react";
import * as motion from "motion/react-client";

interface RadioButtonProps {
    options: {
        value: string;
        label?: string;
        icon?: React.ReactNode;
    }[];
    selected: string;
    onChange: (value: string) => void;
    size?: "sm" | "md" | "lg";
    color?: string;
    rounded?: boolean;
}

const sizeClasses: Record<string, string> = {
    sm: "w-10 h-10 text-sm",
    md: "w-12 h-12 text-md",
    lg: "w-16 h-16 text-lg",
};

const RadioButtonGroup: React.FC<RadioButtonProps> = ({
    options,
    selected,
    onChange,
    size = "md",
    color = "bg-red-500",
    rounded = true,
}) => {


    const getColorClass = (selected: boolean) => {
        switch (color) {
            case 'success':

                return ` ${selected ? "bg-green-500 text-white" : "bg-none text-black dark:text-white border border-green-500 "} hover:shadow-custom`

            case 'danger':

                return `${selected ? "bg-red-500 text-white" : "bg-none text-black dark:text-white border border-red-500 "} hover:shadow-custom`;

            case `warning`:

                return `${selected ? "bg-yellow-500 text-white" : "bg-none text-black dark:text-white border border-yellow-500 "} hover:shadow-custom`;

            case `info`:

                return `${selected ? "bg-blue-500 text-white" : "bg-none text-black dark:text-white border border-blue-500 "} hover:shadow-custom`;

            case `primary`:

                return `${selected ? "bg-primary text-white" : "bg-none text-black dark:text-white border border-primary "} hover:shadow-custom`;

            default:

                return `${selected ? "bg-primary text-white" : "bg-none text-black dark:text-white border border-primary "} hover:shadow-custom`;


        }
    };

    return (
        <div className="flex space-x-2">
            {options.map((option) => (
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                    key={option.value}
                    className={`flex w-full overflow-hidden p-2 items-center  justify-center ${sizeClasses[size]} ${rounded ? "rounded-lg" : "rounded-none"
                        } transition-all duration-200 ${selected === option.value
                            ? `${getColorClass(selected === option.value)}`
                            :  `${getColorClass(selected === option.value)}`
                        }`}
                    onClick={() => onChange(option.value)}
                    aria-pressed={selected === option.value}
                >
                    {option.icon || option.label}
                </motion.button>
            ))}
        </div>
    );
};

export default RadioButtonGroup;
