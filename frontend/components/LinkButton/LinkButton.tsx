import Link from 'next/link';
import React from 'react';
import PropTypes from 'prop-types';

interface LinkButtonProps {
    label: string;
    path: string;
    active: boolean;
    newTab?: boolean; // Optional newTab prop
}

const LinkButton: React.FC<LinkButtonProps> = ({ label, path, active = false, newTab = false }) => {
    return (
        <Link 
            className={`block py-2 px-3 rounded-sm md:hover:text-primary md:p-0 md:dark:hover:text-primary dark:hover:text-primary ${active ? 'text-primary dark:text-primary' : 'text-black dark:text-white'}`} 
            href={path}
            target={newTab ? '_blank' : '_self'} // Open in new tab if newTab is true
            rel={newTab ? 'noopener noreferrer' : undefined} // Add security attributes for new tab
        >
            {label}
        </Link>
    );
};

LinkButton.propTypes = {
    label: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
    newTab: PropTypes.bool, // Add newTab to propTypes
};

export default LinkButton;
