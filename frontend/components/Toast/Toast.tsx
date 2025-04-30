"use client";

import useColorMode from '@/hooks/useColorMode';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toast = () => {
    const [theme, setTheam] = useState('light');
    const [colorMode, setColorMode] = useColorMode();

    useEffect(() => {
        colorMode === 'dark' ? setTheam('dark') : setTheam('light');
    }, [colorMode]);

    return createPortal(
        <ToastContainer
            theme={theme}
            position="top-right"
            autoClose={2000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            transition={Bounce}
            className={"fixed z-1000 mt-40 md:mt-20 "}
        />,
        document.body
    );
};

export default Toast;
