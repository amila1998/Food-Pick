import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as motion from "motion/react-client";
import PropTypes from 'prop-types';

interface FaFaIconButtonProps {
    icon: IconProp;
    label: string;
    type?: 'filled' | 'outlined';
    color?: 'success' | 'danger' | 'warning' | 'info' | 'primary';
    isDisabled?: boolean;
    tooltip?: string;
    onClick: () => void;
    iconPosition?: 'left' | 'right';
    classOveride?: string;
}

const FaFaIconButton: React.FC<FaFaIconButtonProps> = ({
    icon,
    label,
    type = "outlined",
    color = 'primary',
    isDisabled = false,
    tooltip,
    onClick,
    iconPosition = 'left',
    classOveride = '' }) => {

    const getColorClass = (color: string) => {
        switch (color) {
            case 'success':
                if (type === 'outlined') {
                    return 'bg-none boder hover:bg-green-500 border-green-500 text-black dark:text-white'
                } else {
                    return 'bg-green-500 text-white'
                }
            case 'danger':
                if (type === 'outlined') {
                    return 'bg-none boder hover:bg-red-500 border-red-500  text-black dark:text-white';
                } else {
                    return 'bg-red-500 text-white';
                }
            case 'warning':
                if (type === 'outlined') {
                    return 'bg-none boder hover:bg-yellow-500 border-yellow-500  text-black dark:text-white';
                } else {
                    return 'bg-yellow-500 text-white';
                }
            case 'info':
                if (type === 'outlined') {
                    return 'bg-none boder hover:bg-blue-500 border-blue-500  text-black dark:text-white';
                } else {
                    return 'bg-blue-500 text-white';
                }
            case 'primary':
                if (type === 'outlined') {
                    return 'bg-none boder hover:bg-primary border-primary text-black dark:text-white';
                } else {
                    return 'bg-primary text-white';
                }
            default:
                if (type === 'outlined') {
                    return 'bg-none boder hover:bg-primary border-primary  text-black dark:text-white';
                } else {
                    return 'bg-primary text-white';
                }

        }
    };

    return (
        <

            >
            <motion.button type="button" className={`text-black dark:text-white hover:text-white w-[40px] h-[40px] rounded-full font-bold item-center text-center ${getColorClass(color)}  ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}  ${classOveride} `}
                disabled={isDisabled}
                title={tooltip}
                whileHover={{ scale: 1.05 }}
                initial={{ scale: 1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onClick()}

            >
                <FontAwesomeIcon
                size="sm"
                    icon={icon as IconProp}
                    className={` text-center shadow-custom`}
                />
            </motion.button>
        </>
    )
}

FaFaIconButton.propTypes = {
    icon: PropTypes.object as PropTypes.Validator<IconProp>,
    label: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['filled', 'outlined']),
    color: PropTypes.oneOf(['success', 'danger', 'warning', 'info', 'primary']),
    isDisabled: PropTypes.bool,
    tooltip: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    iconPosition: PropTypes.oneOf(['left', 'right']),
    classOveride: PropTypes.string,
};

export default FaFaIconButton