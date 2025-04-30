import AuthLayout from "@/layouts/AuthLayout";
import MyOrdersPage from "@/views/Auth/Orders/MyOdersPage";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "My Orders | FOOD PICK",
        description: "",
        keywords: [
           
        ],
        openGraph: {
            title: "My Orders | FOOD PICK",
            description: "",
            url: "https://yourwebsite.com/signin",
            type: "website",
            // images: [{ url: "https://yourwebsite.com/assets/signin-og-image.jpg", width: 1200, height: 630, alt: "Forgot Password | FOOD PICK" }],
        },
        twitter: {
            card: "summary_large_image",
            title: "My Orders | FOOD PICK",
            site: "",
            description: "",
            // images: ["https://yourwebsite.com/assets/twitter-signin.jpg"],
        }
    }
};

export default function MyOrders() {
    return (
        <AuthLayout>
            <MyOrdersPage />
        </AuthLayout>
    );
}
