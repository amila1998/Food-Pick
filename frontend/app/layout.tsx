import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ThemeModeScript } from "flowbite-react";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import Header from "@/components/Header/Header";
import DefaultLayout from "@/layouts/DefaultLayout";



const poppins = Poppins({ weight: ["400", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Home | Food PICK",
  description: "",
  keywords: [
   
  ],
  openGraph: {
    title: "Food PICK",
    description: "",
    url: "https://yourwebsite.com", //TODO: Update this URL
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "",
    title: "Food PICK",
    description: "",
    // images: ["https://yourwebsite.com/assets/twitter-card.jpg"], //TODO: Update this URL
  },
  icons: {
    icon: "./favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth md:scroll-auto">
      <head>
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Amila Devin" />
        <meta property="og:locale" content="en_US" />
        <meta name="google-site-verification" content="YOUR_GOOGLE_VERIFICATION_CODE" />
        <ThemeModeScript />
      </head>
      <body className={`${poppins.className} min-h-screen bg-white light_body dark:bg-gray-900`}>
        <StoreProvider>
          <Header />
          <DefaultLayout>
          {children}
          </DefaultLayout>
        </StoreProvider>
      </body>
    </html>
  );
}
