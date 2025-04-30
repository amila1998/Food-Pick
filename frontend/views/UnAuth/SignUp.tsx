"use client";
import { createUser } from "@/actions/user";
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import LinkButton from "@/components/LinkButton/LinkButton";
import Loader from "@/components/Loader/Loader";
import Select from "@/components/Select/Select";
import Toast from "@/components/Toast/Toast";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { EYE_CLOSE, EYE_OPEN } from "@/utils/icons";
import { validatePassword } from "@/utils/passwordValidator";
import { validateEmail } from "@/utils/validateEmail";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState, KeyboardEvent } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUpPage: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [isClient, setIsClient] = useState(false);
  const [passwordShow, setPasswordShow] = useState(false);
  const [conformPasswordShow, setConformPasswordShow] = useState(false);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const [formErrors, setFormErrors] = useState<{
    name: string | "";
    email: string | "";
    password: string | "";
    conformPassword: string | "";
    phone: string | "";
    role: string | "";
  }>({
    name: "",
    email: "",
    password: "",
    conformPassword: "",
    phone: "",
    role: "",
  });
  const [formValues, setFormValues] = useState<{
    name: string | "";
    email: string | "";
    password: string | "";
    conformPassword: string | "";
    phone: string | "";
    role: string | "";
  }>({
    name: "",
    email: "",
    password: "",
    conformPassword: "",
    phone: "",
    role: "customer",
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

  const handleRegisterCustomer = async () => {
    if (!formValues.name) {
      setFormErrors((errs) => ({
        ...errs,
        name: "Name is required",
      }));
      return;
    } else {
      setFormErrors((errs) => ({
        ...errs,
        name: "",
      }));
    }
    if (!formValues.email) {
      setFormErrors((errs) => ({
        ...errs,
        email: "Email is required",
      }));
      return;
    } else {
      setFormErrors((errs) => ({
        ...errs,
        email: "",
      }));
    }
    if (!formValues.password) {
      setFormErrors((errs) => ({
        ...errs,
        password: "Password is required",
      }));
      return;
    } else {
      setFormErrors((errs) => ({
        ...errs,
        password: "",
      }));
    }
    if (!formValues.phone) {
      setFormErrors((errs) => ({
        ...errs,
        phone: "Phone is required",
      }));
      return;
    } else {
      setFormErrors((errs) => ({
        ...errs,
        phone: "",
      }));
    }
    if (!formValues.role) {
      setFormErrors((errs) => ({
        ...errs,
        role: "Role is required",
      }));
      return;
    } else {
      setFormErrors((errs) => ({
        ...errs,
        role: "",
      }));
    }
    if (!validateEmail(formValues.email)) {
      setFormErrors((errs) => ({
        ...errs,
        email: "Invalid email",
      }));
      return;
    } else {
      setFormErrors((errs) => ({
        ...errs,
        email: "",
      }));
    }
    if (!validatePassword(formValues.password)) {
      setFormErrors((errs) => ({
        ...errs,
        password: "Invalid password",
      }));
      return;
    } else {
      setFormErrors((errs) => ({
        ...errs,
        password: "",
      }));
    }

    if (formValues.password != formValues.conformPassword) {
      setFormErrors((errs) => ({
        ...errs,
        conformPassword: "Password not matched",
      }));
      return;
    } else {
      setFormErrors((errs) => ({
        ...errs,
        conformPassword: "",
      }));
    }
    try {
      await dispatch(
        createUser({
            name: formValues.name,
          email: formValues.email,
          password: formValues.password,
            phone: formValues.phone,
            role: formValues.role,
        }),
      );
      router.push(
        "/signin?message=Registration successful. Please login to continue",
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Registration failed");
      }
    }
  };

  // Handle key press for form submission on Enter
  const handleKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter") {
      handleRegisterCustomer();
    }
  };

  return (
    <>
      {!isClient && <Loader />}
      <Toast />
      <div className="relevent flex items-center justify-center">
        <div className="m-auto w-[95%] items-center justify-center rounded-3xl bg-body_light p-5 text-center dark:bg-body_dark dark:text-white md:w-1/4">
          <h1 className="text-3xl font-semibold text-black dark:text-white">
            SIGN UP
          </h1>
          <form
            className="mt-5 max-h-[65vh] overflow-x-auto p-4"
            onKeyDown={handleKeyDown}
          >
            <div className="mb-4">
              <Input
                value={formValues.name}
                id="user_name"
                name="user_name"
                label="Name"
                type="name"
                onChange={(e) => {
                  setFormValues((values) => ({
                    ...values,
                    name: e.target.value,
                  }));
                }}
                isRequired={true}
                placeholder="Enter your name"
                error={formErrors.name}
              />
            </div>
            <div className="mb-4">
              <Input
                value={formValues.email}
                ref={emailInputRef}
                id="user_email"
                name="user_email"
                label="Email"
                type="email"
                onChange={(e) => {
                  setFormValues((values) => ({
                    ...values,
                    email: e.target.value,
                  }));
                }}
                isRequired={true}
                placeholder="Enter your email"
                error={formErrors.email}
              />
            </div>
            <div className="mb-4">
              <Input
                value={formValues.password}
                id="user_password"
                iconRight={passwordShow ? EYE_OPEN : EYE_CLOSE}
                onClickRightIcon={handleShowPassword}
                name="user_password"
                label="Password"
                type={passwordShow ? "text" : "password"}
                onChange={(e) => {
                  setFormValues((values) => ({
                    ...values,
                    password: e.target.value,
                  }));
                }}
                isRequired={true}
                placeholder="Enter your Password"
                error={formErrors.password}
              />
            </div>
            <div className="mb-4">
              <Input
                value={formValues.conformPassword}
                id="user_conform_password"
                iconRight={conformPasswordShow ? EYE_OPEN : EYE_CLOSE}
                onClickRightIcon={handleShowConformPassword}
                name="user_conform_password"
                label="Conform Password"
                type={passwordShow ? "text" : "password"}
                onChange={(e) => {
                  setFormValues((values) => ({
                    ...values,
                    conformPassword: e.target.value,
                  }));
                }}
                isRequired={true}
                placeholder="Re enter your Password"
                error={formErrors.conformPassword}
              />
            </div>
            <div className="mb-4">
              <Input
                label="Phone"
                name="user_phone"
                value={formValues.phone}
                id="user_phone"
                isRequired={true}
                placeholder="Enter Your Phone Number"
                error={formErrors.phone}
                onChange={(e) => {
                  setFormValues((values) => ({
                    ...values,
                    phone: e.target.value,
                  }));
                }}
                type={"text"}
              />
            </div>
            <div className="mb-4">
              <Select
                id="role"
                name="role"
                label="Role"
                value={formValues.role}
                onChange={(e) => {
                  setFormValues((values) => ({
                    ...values,
                    role: e.target.value,
                  }));
                }}
                placeholder="Choose a Role"
                options={[
                  { value: "customer", label: "Customer" },
                  { value: "restaurant", label: "Restaurant" },
                ]}
                isRequired
                error={formErrors.role}
              />
            </div>
            <div className="mb-4">
              <Button
                label="Sign Up"
                onClick={handleRegisterCustomer}
                type="filled"
                color="primary"
              />
            </div>
            <div className="p-1">
              <div className="my-4 flex items-center justify-center">
                <hr className="w-full border-gray-300 dark:border-gray-600" />
                <span className="px-2 text-sm text-black dark:text-white">
                  OR
                </span>
                <hr className="w-full border-gray-300 dark:border-gray-600" />
              </div>
            </div>
            <div className="p-1">
              <span className="flex flex-col justify-center gap-2 text-sm text-black dark:text-white md:flex-row md:p-0">
                Have an account ?{" "}
                <LinkButton label="Sign In" path="/signin" active={false} />
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
