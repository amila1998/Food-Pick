"use client";
import { login } from "@/actions/user";
import Button from "@/components/Button/Button";
import ImageIconButton from "@/components/IconButton/ImageIconButton";
import Input from "@/components/Input/Input";
import LinkButton from "@/components/LinkButton/LinkButton";
import Loader from "@/components/Loader/Loader";
import Toast from "@/components/Toast/Toast";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { EYE_CLOSE, EYE_OPEN } from "@/utils/icons";
import { validatePassword } from "@/utils/passwordValidator";
import { validateEmail } from "@/utils/validateEmail";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState, KeyboardEvent } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

interface SignInPageProps {
    redirect?: string;
}

const SignInPage: React.FC<SignInPageProps> = ({ redirect }) => {
    const [isClient, setIsClient] = useState(false);
    const [passwordShow, setPasswordShow] = useState(false);
    const emailInputRef = useRef<HTMLInputElement>(null);
    const dispatch = useAppDispatch();
    const router = useRouter();

    const [formErrors, setFormErrors] = useState<{
        email: string | '';
        password: string | '';
    }>({
        email: '',
        password: ''
    });
    const [formValues, setFormValues] = useState<{
        email: string | '';
        password: string | '';
    }>({
        email: '',
        password: ''
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

    const handleLogin = async(): Promise<void> => {

        if (!formValues.email) {
            setFormErrors(errs => ({
                ...errs,
                email: 'Email is required'
            }));
            return
        } else {
            setFormErrors(errs => ({
                ...errs,
                email: ''
            }));
        }
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
        if (!validateEmail(formValues.email)) {
            setFormErrors(errs => ({
                ...errs,
                email: 'Invalid email'
            }));
            return
        } else {
            setFormErrors(errs => ({
                ...errs,
                email: ''
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

        try {
            await dispatch(login({email:formValues.email,password:formValues.password}));
            if(redirect) {
                router.push(redirect)
            }else{
                router.back()

            }
        } catch (error:unknown) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("Sign In failed");
            }
        }

    };


    // Handle key press for form submission on Enter
    const handleKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    };

    return (
        <>
            {!isClient && <Loader />}
            <Toast />
            <div className="relevent flex justify-center items-center">
                <div className="md:w-1/4 w-[95%] p-4 justify-center items-center text-center m-auto rounded-3xl bg-body_light dark:bg-body_dark dark:text-white">
                    <h1 className="text-3xl font-semibold text-black dark:text-white">SIGN IN</h1>
                    <form className="mt-5 max-h-[58vh] overflow-x-auto p-4" onKeyDown={handleKeyDown}>
                        <div className="mb-4">
                            <Input value={formValues.email} ref={emailInputRef} id="user_email" name="user_email" label="Email" type="email" onChange={(e) => { setFormValues(values => ({ ...values, email: e.target.value })) }} isRequired={true} placeholder="Enter your email" error={formErrors.email} />
                        </div>
                        <div className="mb-4">
                            <Input value={formValues.password} id="user_password" iconRight={passwordShow ? EYE_OPEN : EYE_CLOSE} onClickRightIcon={handleShowPassword} name="user_password" label="Password" type={passwordShow ? "text" : "password"} onChange={(e) => { setFormValues(values => ({ ...values, password: e.target.value })) }} isRequired={true} placeholder="Enter your Password" error={formErrors.password} />
                        </div>
                        <div className="mb-4">
                            <Button label="Sign In" onClick={handleLogin} type="filled" color="primary" />
                        </div>
                        <div className="mb-4">
                            <LinkButton label="Forgot Password ?" path="/forgot-password" active={false}/>
                        </div>
                        <div className="">
                            <div className="flex items-center justify-center my-4">
                                <hr className="w-full border-gray-300 dark:border-gray-600" />
                                <span className="px-2 text-sm text-black dark:text-white">OR</span>
                                <hr className="w-full border-gray-300 dark:border-gray-600" />
                            </div>
                        </div>
                        <div className="p-1">
                            <span className="flex md:flex-row flex-col md:p-0 justify-center text-sm text-black dark:text-white gap-2">Haven’t an account ? <LinkButton label="Sign Up" path="/signup" active={false}/></span>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default SignInPage;
