import AuthLayout from "@/layouts/AuthLayout";
import ProfileSettingsPage from "@/views/Auth/Profile/ProfileSettingsPage";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Profile Settings | FOOD PICK",
        description: "",
        keywords: [
            "Profile Settings",
            "Profile",
            "FOOD PICK",
            "Sales Training Access",
            "Leadership Development Portal",
            "Suranjith Godagama Login",
            "Business Growth",
            "Sales and Leadership Training",
            "Insurance sales mentor",
            "sales coaching",
            "globevik",
            "FOOD PICK training",
            "Sri Lanka business growth",
            "LK leadership development",
            "successful sales techniques",
            "professional skills development",
            "corporate training solutions",
            "motivational speaking events",
            "entrepreneurial success strategies",
            "effective team leadership",
            "online business coaching",
            "customer relationship management",
            "career growth opportunities"
        ],
        openGraph: {
            title: "Profile Settings | FOOD PICK",
            description: "",
            url: "https://yourwebsite.com/signin",
            type: "website",
            // images: [{ url: "https://yourwebsite.com/assets/signin-og-image.jpg", width: 1200, height: 630, alt: "Forgot Password | FOOD PICK" }],
        },
        twitter: {
            card: "summary_large_image",
            title: "Profile Settings | FOOD PICK",
            site: "",
            description: "",
            // images: ["https://yourwebsite.com/assets/twitter-signin.jpg"],
        }
    }
};

export default function ProfileSettings() {
    return (
        <AuthLayout>
            <ProfileSettingsPage />
        </AuthLayout>
    );
}
