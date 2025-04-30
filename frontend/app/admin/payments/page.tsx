import AdminLayout from "@/layouts/AdminLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Payment Management | FOOD PICK",
    description: "",
    keywords: [
       
    ],
    openGraph: {
        title: "Payment Management | FOOD PICK",
        description: "",
        url: "https://yourwebsite.com/signin",
        type: "website",
        // images: [{ url: "https://yourwebsite.com/assets/signin-og-image.jpg", width: 1200, height: 630, alt: "Forgot Password | FOOD PICK" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Payment Management | FOOD PICK",
        site: "",
        description: "",
        // images: ["https://yourwebsite.com/assets/twitter-signin.jpg"],
    }
};

export default function Payments() {
    return (
        <AdminLayout>
            <>Payments</>
        </AdminLayout>
    );
}
