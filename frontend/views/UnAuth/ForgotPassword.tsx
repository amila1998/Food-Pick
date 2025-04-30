"use client";
import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import LinkButton from '@/components/LinkButton/LinkButton';
import Loader from '@/components/Loader/Loader';
import { useAppSelector } from '@/lib/hooks';
import { validateEmail } from '@/utils/validateEmail';
import React, { KeyboardEvent, useEffect, useRef, useState } from 'react'

const ForgotPasswordPage: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const [passwordShow, setPasswordShow] = useState(false);
  const [conformPasswordShow, setConformPasswordShow] = useState(false);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const [formErrors, setFormErrors] = useState<{
    email: string | '';
  }>({
    email: '',
  });
  const [formValues, setFormValues] = useState<{
    email: string | '';
  }>({
    email: '',
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

  const handleCustomerForgotPassword = () => {

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


  };

  // Handle key press for form submission on Enter
  const handleKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') {
      handleCustomerForgotPassword();
    }
  };

  return (
    <>
      {!isClient && <Loader />}
      <div className="relevent flex justify-center items-center">
        <div className="md:w-1/4 w-[95%] p-5 justify-center items-center text-center m-auto rounded-3xl bg-body_light dark:bg-body_dark dark:text-white">
          <h1 className="text-3xl font-semibold text-black dark:text-white">Forgot Password</h1>
          <form className="mt-5 max-h-[60vh] overflow-x-auto p-4" onKeyDown={handleKeyDown}>
            <div className="mb-4">
              <Input value={formValues.email} ref={emailInputRef} id="user_email" name="user_email" label="Email" type="email" onChange={(e) => { setFormValues(values => ({ ...values, email: e.target.value })) }} isRequired={true} placeholder="Enter your email" error={formErrors.email} />
            </div>
            <div className="mb-4">
              <Button label="Submit" onClick={handleCustomerForgotPassword} type="filled" color="primary" />
            </div>
            <div className="p-1">
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
  )
}

export default ForgotPasswordPage
