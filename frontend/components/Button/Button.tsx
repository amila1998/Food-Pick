import * as motion from "motion/react-client";
import PropTypes from 'prop-types';

interface ButtonProps {
    label: string;
    type?: 'filled' | 'outlined';
    color?: 'success' | 'danger' | 'warning' | 'info' | 'primary';
    isDisabled?: boolean;
    tooltip?: string;
    icon?: React.ReactNode;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    iconPosition?: 'left' | 'right';
    classOveride?: string;
}

const Button: React.FC<ButtonProps> = ({
    label,
    type = "filled",
    color = 'success',
    isDisabled = false,
    tooltip,
    icon,
    onClick,
    iconPosition = 'left',
    classOveride = '' }) => {

    const getColorClass = (color: string) => {
        switch (color) {
            case 'success':
                if (type === 'outlined') {
                    return 'bg-none border border-green-500 dark:text-white'
                } else {
                    return 'bg-green-500 text-white'
                }
            case 'danger':
                if (type === 'outlined') {
                    return 'bg-none border border-red-500 text-black dark:text-white';
                } else {
                    return 'bg-red-500 text-white';
                }
            case 'warning':
                if (type === 'outlined') {
                    return 'bg-none border border-yellow-500 text-black dark:text-white';
                } else {
                    return 'bg-yellow-500 text-white';
                }
            case 'info':
                if (type === 'outlined') {
                    return 'bg-none border border-blue-500 text-black dark:text-white';
                } else {
                    return 'bg-blue-500 text-white';
                }
            case 'primary':
                if (type === 'outlined') {
                    return 'bg-none border border-primary dark:text-white';
                } else {
                    return 'bg-primary text-white';
                }
            default:
                if (type === 'outlined') {
                    return 'bg-none border border-primary text-black dark:text-white';
                } else {
                    return 'bg-primary text-white';
                }

        }
    };

    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
        >
            <button type="button" className={`w-full p-3 rounded-full font-bold ${getColorClass(color)}  ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}  ${classOveride} `}
                disabled={isDisabled}
                title={tooltip}
                onClick={(e) => onClick(e)}
            >
                {label.toUpperCase()}
            </button>
        </motion.div>
    )
}

Button.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['filled', 'outlined']),
    color: PropTypes.oneOf(['success', 'danger', 'warning', 'info', 'primary']),
    isDisabled: PropTypes.bool,
    tooltip: PropTypes.string,
    icon: PropTypes.element,
    onClick: PropTypes.func.isRequired,
    iconPosition: PropTypes.oneOf(['left', 'right']),
    classOveride: PropTypes.string,
};

export default Button