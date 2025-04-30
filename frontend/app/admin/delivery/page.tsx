import AdminLayout from "@/layouts/AdminLayout";
// import UserManagementPage from "@/views/Admin/Users/Users";
import CartPage from "@/views/Cart/CartPage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Delivery User Management | FOOD PICK",
    description: "",
    keywords: [
        
    ],
    openGraph: {
        title: "User Management | FOOD PICK",
        description: "",
        url: "https://yourwebsite.com/signin",
        type: "website",
        // images: [{ url: "https://yourwebsite.com/assets/signin-og-image.jpg", width: 1200, height: 630, alt: "Forgot Password | FOOD PICK" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "User Management | FOOD PICK",
        site: "",
        description: "",
        // images: ["https://yourwebsite.com/assets/twitter-signin.jpg"],
    }
};

export default function Users() {
    return (
        <AdminLayout>
            <></>
            {/* <UserManagementPage/> */}
        </AdminLayout>
    );
}
