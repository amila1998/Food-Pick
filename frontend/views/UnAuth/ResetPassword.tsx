"use client";
import Button from "@/components/Button/Button";
import ImageIconButton from "@/components/IconButton/ImageIconButton";
import Input from "@/components/Input/Input";
import LinkButton from "@/components/LinkButton/LinkButton";
import Loader from "@/components/Loader/Loader";
import { useAppSelector } from "@/lib/hooks";
import { EYE_CLOSE, EYE_OPEN } from "@/utils/icons";
import { validatePassword } from "@/utils/passwordValidator";
import { validateEmail } from "@/utils/validateEmail";
import { error } from "console";
import React, { useEffect, useRef, useState, KeyboardEvent } from "react";

const ResetPasswordPage: React.FC = () => {
    const [isClient, setIsClient] = useState(false);
    const [passwordShow, setPasswordShow] = useState(false);
    const [conformPasswordShow, setConformPasswordShow] = useState(false);
    const emailInputRef = useRef<HTMLInputElement>(null);
    const [formErrors, setFormErrors] = useState<{
        password: string | '';
        conformPassword: string | '';
    }>({
        password: '',
        conformPassword: ''
    });
    const [formValues, setFormValues] = useState<{
        password: string | '';
        conformPassword: string | '';
    }>({
        password: '',
        conformPassword: ''
    });

    useEffect(() => {
        setIsClient(true);
    }, []);

    // Focus on email input on component mount
    useEffect(() => {
        if (emailInputRef.current) {
            emailInputRef.current.focus();
        }
    }, []);

    // Handle show password
    const handleShowPassword = () => {
        setPasswordShow(!passwordShow);
    };

    // Handle show conform password
    const handleShowConformPassword = () => {
        setConformPasswordShow(!conformPasswordShow);
    };

    const handleResetPasswordCustomer = () => {


        if (!formValues.password) {
            setFormErrors(errs => ({
                ...errs,
                password: 'Password is required'
            }));
            return
        } else {
            setFormErrors(errs => ({
                ...errs,
                password: ''
            }));
        }

        if (!validatePassword(formValues.password)) {
            setFormErrors(errs => ({
                ...errs,
                password: 'Invalid password'
            }));
            return
        } else {
            setFormErrors(errs => ({
                ...errs,
                password: ''
            }));
        }

        if (formValues.password != formValues.conformPassword) {
            setFormErrors(errs => ({
                ...errs,
                conformPassword: 'Password not matched'
            }));
            return
        } else {
            setFormErrors(errs => ({
                ...errs,
                conformPassword: ''
            }));
        }

    };

    // Handle key press for form submission on Enter
    const handleKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
        if (e.key === 'Enter') {
            handleResetPasswordCustomer();
        }
    };

    return (
        <>
            {!isClient && <Loader />}
            <div className="relevent flex justify-center items-center">
                <div className="md:w-1/4 w-[95%] p-5 justify-center items-center text-center m-auto rounded-3xl bg-body_light dark:bg-body_dark dark:text-white">
                    <h1 className="text-3xl font-semibold text-black dark:text-white">RESET PASSWORD</h1>
                    <form className="mt-5 max-h-[60vh] overflow-x-auto p-4" onKeyDown={handleKeyDown}>
                        <div className="mb-4">
                            <Input value={formValues.password} id="user_password" iconRight={passwordShow ? EYE_OPEN : EYE_CLOSE} onClickRightIcon={handleShowPassword} name="user_password" label="Password" type={passwordShow ? "text" : "password"} onChange={(e) => { setFormValues(values => ({ ...values, password: e.target.value })) }} isRequired={true} placeholder="Enter your Password" error={formErrors.password} />
                        </div>
                        <div className="mb-4">
                            <Input value={formValues.conformPassword} id="user_conform_password" iconRight={conformPasswordShow ? EYE_OPEN : EYE_CLOSE} onClickRightIcon={handleShowConformPassword} name="user_conform_password" label="Conform Password" type={passwordShow ? "text" : "password"} onChange={(e) => { setFormValues(values => ({ ...values, conformPassword: e.target.value })) }} isRequired={true} placeholder="Re enter your Password" error={formErrors.conformPassword} />
                        </div>
                        <div className="mb-4">
                            <Button label="Reset" onClick={handleResetPasswordCustomer} type="filled" color="primary" />
                        </div>
                        <div className="p-1">
                            <div className="flex items-center justify-center my-4">
                                <hr className="w-full border-gray-300 dark:border-gray-600" />
                                <span className="px-2 text-sm text-black dark:text-white">OR</span>
                                <hr className="w-full border-gray-300 dark:border-gray-600" />
                            </div>
                        </div>
                        <div className="p-1">
                            <span className="flex md:flex-row flex-col md:p-0 justify-center text-sm text-black dark:text-white gap-2">Remember Password ? <LinkButton label="Sign In" path="/signin" active={false}/></span>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default ResetPasswordPage;
