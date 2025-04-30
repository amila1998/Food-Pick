import AdminLayout from "@/layouts/AdminLayout";
import DashboardPage from "@/views/Admin/DashBoard/DashboardPage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dashboard | FOOD PICK",
    description: "",
    keywords: [
       
    ],
    openGraph: {
        title: "Dashboard | FOOD PICK",
        description: "",
        url: "https://yourwebsite.com/signin",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Dashboard | FOOD PICK",
        site: "",
        description: "",
        // images: ["https://yourwebsite.com/assets/twitter-signin.jpg"],
    }
};

export default function Page() {
    return (
        <AdminLayout>
            <DashboardPage/>
        </AdminLayout>
    );
}
