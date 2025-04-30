import CheckoutPage from "@/views/Checkout/CheckoutPage ";
import { Metadata } from "next";

type Props = {
    params: Promise<{ courseId?: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
  }
   

export const metadata: Metadata = {
    title: "Checkout | FOOD PICK",
    description: "",
    keywords: [
      
    ],
    openGraph: {
        title: "Checkout | FOOD PICK",
        description: "",
        url: "https://yourwebsite.com/signin",
        type: "website",
        // images: [{ url: "https://yourwebsite.com/assets/signin-og-image.jpg", width: 1200, height: 630, alt: "Forgot Password | FOOD PICK" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Checkout | FOOD PICK",
        site: "",
        description: "",
        // images: ["https://yourwebsite.com/assets/twitter-signin.jpg"],
    }
};

export default async function Page({
    params,
    searchParams,
}: Props) {

    return (
        <>
            <CheckoutPage/>
        </>
    );
}
