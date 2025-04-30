import AdminLayout from "@/layouts/AdminLayout";
import ItemsManagementPage from "@/views/Admin/Items/Items";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Items Management | FOOD PICK",
    description: "",
    keywords: [
        
    ],
    openGraph: {
        title: "Items Management | FOOD PICK",
        description: "",
        url: "https://yourwebsite.com/signin",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Items Management | FOOD PICK",
        site: "",
        description: "",
        // images: ["https://yourwebsite.com/assets/twitter-signin.jpg"],
    }
};

export default function Page() {
    return (
        <AdminLayout>
            <ItemsManagementPage/>
        </AdminLayout>
    );
}
