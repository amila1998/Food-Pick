import ForgotPasswordPage from "@/views/UnAuth/ForgotPassword";
import ResetPasswordPage from "@/views/UnAuth/ResetPassword";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Reset Password | FOOD PICK",
    description: "",
    keywords: [
       
    ],
    openGraph: {
        title: "Reset Password | FOOD PICK",
        description: "",
        url: "https://yourwebsite.com/signin",
        type: "website",
        // images: [{ url: "https://yourwebsite.com/assets/signin-og-image.jpg", width: 1200, height: 630, alt: "Reset Password | FOOD PICK" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Reset Password | FOOD PICK",
        site: "",
        description: "",
        // images: ["https://yourwebsite.com/assets/twitter-signin.jpg"],
    }
};

export default function ResetPassword() {
    return (
        <>
            <ResetPasswordPage />
        </>
    );
}
