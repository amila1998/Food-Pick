import CartPage from "@/views/Cart/CartPage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "My Cart | FOOD PICK",
    description: "",
    keywords: [
     
    ],
    openGraph: {
        title: "My Cart | FOOD PICK",
        description: "",
        url: "https://yourwebsite.com/signin",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "My Cart | FOOD PICK",
        site: "",
        description: "",
    }
};

export default function Cart() {
    return (
        <>
            <CartPage />
        </>
    );
}
