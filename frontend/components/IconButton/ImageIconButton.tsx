import * as motion from "motion/react-client";
import Image from "next/image";
import PropTypes from 'prop-types';

interface ImageIconButtonProps {
    src: string;
    label: string;
    type?: 'filled' | 'outlined';
    color?: 'success' | 'danger' | 'warning' | 'info' | 'primary';
    isDisabled?: boolean;
    tooltip?: string;
    icon?: React.ReactNode;
    onClick: () => void;
    iconPosition?: 'left' | 'right';
    classOveride?: string;
}

const ImageIconButton: React.FC<ImageIconButtonProps> = ({
    src,
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
                    return 'bg-none border-2 border-green-500 text-black dark:text-white'
                } else {
                    return 'bg-green-500 text-white'
                }
            case 'danger':
                if (type === 'outlined') {
                    return 'bg-none border-2 border-red-500 text-white text-black dark:text-white';
                } else {
                    return 'bg-red-500 text-white';
                }
            case 'warning':
                if (type === 'outlined') {
                    return 'bg-none border-2 border-yellow-500 text-white text-black dark:text-white';
                } else {
                    return 'bg-yellow-500 text-white';
                }
            case 'info':
                if (type === 'outlined') {
                    return 'bg-none border-2 border-blue-500 text-white text-black dark:text-white';
                } else {
                    return 'bg-blue-500 text-white';
                }
            case 'primary':
                if (type === 'outlined') {
                    return 'bg-none border-2 border-primary text-white text-black dark:text-white';
                } else {
                    return 'bg-primary text-white';
                }
            default:
                if (type === 'outlined') {
                    return 'bg-none border-2 border-primary text-white text-black dark:text-white';
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
            <button type="button" className={`h-[50px] w-[50px] p-3 rounded-full font-bold ${getColorClass(color)}  ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}  ${classOveride} `}
                disabled={isDisabled}
                title={tooltip}
                onClick={() => onClick()}
            >
                <Image
                    src={src}
                    alt={label}
                    width={100}
                    height={100}
                    />
            </button>
        </motion.div>
    )
}

ImageIconButton.propTypes = {
    src: PropTypes.string.isRequired,
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

export default ImageIconButton