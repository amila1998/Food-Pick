import ForgotPasswordPage from "@/views/UnAuth/ForgotPassword";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Forgot Password | FOOD PICK",
    description: "",
    keywords: [
      
    ],
    openGraph: {
        title: "Forgot Password | FOOD PICK",
        description: "",
        url: "https://yourwebsite.com/signin",
        type: "website",
       
    },
    twitter: {
        card: "summary_large_image",
        title: "Forgot Password | FOOD PICK",
        site: "",
        description: "",
        // images: ["https://yourwebsite.com/assets/twitter-signin.jpg"],
    }
};

export default function ForgotPassword() {
    return (
        <>
            <ForgotPasswordPage />
        </>
    );
}
