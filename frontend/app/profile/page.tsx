
import ProfilePage from "@/views/Profile/Profile";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
 


export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedSearchParams = await searchParams;
  const uid = resolvedSearchParams?.id;

  if (!uid) {
    return defaultMetadata;
  }

  try {
    // const user = await getUserDetailsByUidServer(uid); // Server-side call (Admin SDK)
    const displayName ="User";

    return {
      title: `${displayName}'s Profile | FOOD PICK`,
      description: `View ${displayName}'s public profile and journey on FOOD PICK.`,
      keywords: [
        displayName,
        "FOOD PICK",
        "Profile",
        "Sales",
        "Leadership",
        "Suranjith Godagama",
        "Globevik",
        "Training",
      ],
      openGraph: {
        title: `${displayName}'s Profile | FOOD PICK`,
        description: `View ${displayName}'s professional details and interests on FOOD PICK.`,
        url: `https://yourdomain.com/profile?id=${uid}`,
        type: "profile",
      },
      twitter: {
        card: "summary_large_image",
        title: `${displayName}'s Profile | FOOD PICK`,
        description: `Discover ${displayName}'s professional growth on FOOD PICK.`,
        site: "",
      },
    };
  } catch (error) {
    return defaultMetadata;
  }
}

const defaultMetadata: Metadata = {
  title: "Profile | FOOD PICK",
  description: "",
  keywords: [
   
  ],
  openGraph: {
    title: "Profile | FOOD PICK",
    description: "",
    url: "https://yourdomain.com/profile",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Profile | FOOD PICK",
    site: "",
    description: "Discover transformative coaching from FOOD PICK.",
  },
};

export default function Profile() {
  return <ProfilePage/>;
}
