
import SignUpPage from "@/views/UnAuth/SignUp";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sign Up | FOOD PICK",
    description: "",
    keywords: [
       
    ],
    openGraph: {
        title: "Sign Up | FOOD PICK",
        description: "",
        url: "https://yourwebsite.com/signin",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Sign Up | FOOD PICK",
        site: "",
        description: "",
        // images: ["https://yourwebsite.com/assets/twitter-signin.jpg"],
    }
};
export default function SignUp() {

    return (
        <>
            <SignUpPage />
        </>
    );
}
