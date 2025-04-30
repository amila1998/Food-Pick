"use client";

import { DarkThemeToggle, Navbar, Dropdown, } from "flowbite-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import LinkButton from "../LinkButton/LinkButton";
import FaFaIconButton from "../IconButton/FaFaIconButton";
import { CART_ICON } from "@/utils/icons";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/actions/user";



const Header: React.FC = () => {
  interface AuthUser {
    name: string;
    email: string;
    role: string;
    phoneNumber: string;
    // Add other properties as needed
  }

  const auth = useAppSelector((state) => state.auth.user) as unknown as AuthUser | null;
  const cart = useAppSelector((state) => state.cart.data);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      await dispatch(logout({}));
      router.push("/signin")
    } catch (error: any) {
      toast.error(error)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const pathname = usePathname();

  return (
    <Navbar fluid rounded className={`fixed top-0 w-full items-center md:w-[95%] z-100 shadow-custom rounded-3xl mt-2 transition-all duration-300 ${isScrolled ? "bg-white dark:bg-black shadow-lg" : "bg-white dark:bg-black shadow-lg md:bg-transparent"
      }`}>
      <Link
        href="/"
      >
        {/* <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" /> */}
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">FOOD PICK</span>
      </Link>
      <div className="flex md:order-2">
        <div className="relative">
          <FaFaIconButton
            label="Cart"
            onClick={() => router.push("/cart")}
            icon={CART_ICON}
          />

          {cart.length > 0 && (
            <span
              className="absolute -top-1 -right-1 min-w-[16px] h-[16px] px-[4px] text-[10px] leading-[16px] font-semibold rounded-full bg-red-600 text-white text-center shadow-sm"
              aria-label={`You have ${cart.length} items in your cart`}
            >
              {cart.length >= 100 ? "99+" : cart.length}
            </span>
          )}
        </div>
        <DarkThemeToggle className="hover:bg-primary dark:hover:bg-primary text-black dark:text-white flex text-sm bg-transparent rounded-full focus:ring-1 focus:ring-primary_focus dark:focus:ring-primary_focus mr-2 hover:text-white hover:scale-100" />
        {auth ? (
          <Dropdown
            arrowIcon={false}
            inline
            className="bg-white dark:bg-black shadow-lg"
            label={
              <Image
                className="h-10 w-10 rounded-full"
                width={50}
                height={50}
                src={'/assets/default-avatar-icon.jpg'}
                alt={auth.name + "_User Avatar"}
                loading="lazy"
              />
            }
          >
            <Dropdown.Header>
              {
                
                  <span className="block text-sm">{auth.name}</span>
             
              }
              <span className="block truncate text-sm font-medium">{auth.email || "No email available"}</span>
            </Dropdown.Header>
            <div className="p-4">
              <LinkButton label="Proflie" path="/auth/profile-settings" active={false} />
              <Dropdown.Divider />
              <div onClick={() => { handleLogout() }} className="block py-2 px-3 text-black rounded-sm md:hover:text-primary md:p-0 dark:text-white md:dark:hover:text-primary dark:hover:text-primary cursor-pointer">Sign out</div>
            </div>
          </Dropdown>
        ) : (
          <div className="items-center mt-2">
            <LinkButton label="Sign in" path="/signin" active={false} />
          </div>

        )}


        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link
          className={`block py-2 px-3 text-black rounded-sm md:p-0 dark:text-white ${pathname === "/resturents" ? "text-primary dark:text-primary" : "md:hover:text-primary md:dark:hover:text-primary dark:hover:text-primary"
            }`}
          href="/resturents"
        >
          Restaurants
        </Navbar.Link>
        <Navbar.Link
          className={`block py-2 px-3 text-black rounded-sm md:p-0 dark:text-white ${pathname === "/terms-and-conditions" ? "text-primary dark:text-primary" : "md:hover:text-primary md:dark:hover:text-primary dark:hover:text-primary"
            }`}
          href="/terms-and-conditions"
        >
          T & C
        </Navbar.Link>
        <Navbar.Link
          className={`block py-2 px-3 text-black rounded-sm md:p-0 dark:text-white ${pathname === "/contact-us" ? "text-primary dark:text-primary" : "md:hover:text-primary md:dark:hover:text-primary dark:hover:text-primary"
            }`}
          href="/contact-us"
        >
          Contact us
        </Navbar.Link>
        {
          auth && auth.role === "restaurant" &&
          <Navbar.Link
            className={`block py-2 px-3 text-black rounded-sm md:p-0 dark:text-white ${pathname === "/admin/dashboard" ? "text-primary dark:text-primary" : "md:hover:text-primary md:dark:hover:text-primary dark:hover:text-primary"
              }`}
            href="/admin/dashboard"
          >
            Dashboard
          </Navbar.Link>
        }
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
