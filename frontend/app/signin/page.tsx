import SignInPage from "@/views/UnAuth/SignIn";
import { Metadata } from "next";

type Props = {
    params: Promise<{ redirect?: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
  }
   

export const metadata: Metadata = {
    title: "Sign In | FOOD PICK",
    description: "",
    keywords: [
   
    ],
    openGraph: {
        title: "Sign In | FOOD PICK",
        description: "Log in to unlock premium sales and leadership training content.",
        url: "https://yourwebsite.com/signin",
        type: "website",
        // images: [{ url: "https://yourwebsite.com/assets/signin-og-image.jpg", width: 1200, height: 630, alt: "Sign In | FOOD PICK" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Sign In | FOOD PICK",
        site: "",
        description: "",
        // images: ["https://yourwebsite.com/assets/twitter-signin.jpg"],
    }
};

export default async function Page({
    params,
    searchParams,
}: Props) {
    const redirectParam = await searchParams;
    const redirect = Array.isArray(redirectParam.redirect) ? redirectParam.redirect[0] : redirectParam.redirect;

     
    return (
        <>
            <SignInPage redirect={redirect}/>
        </>
    );
}
