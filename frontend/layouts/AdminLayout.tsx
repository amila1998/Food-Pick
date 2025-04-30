"use client"
import Loader from "@/components/Loader/Loader";
import { useAppSelector } from "@/lib/hooks";
import { AnimatePresence } from "motion/react";
import { ReactNode, useEffect, useState } from "react";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import LinkButton from "@/components/LinkButton/LinkButton";

const adminroutes = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    hasPermission: true,
  },
  {
    name: "Items",
    path: "/admin/items",
    hasPermission: true,
  },
  {
    name: "Payments",
    path: "/admin/payments",
    hasPermission: true,
  },
];


export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [isClient, setIsClient] = useState(false);
  const auth = useAppSelector((state) => state.auth.user as unknown as { role: string } | null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  console.log("🚀 ~ auth:", auth)
  const [routes, setRoutes] = useState([...adminroutes]);
  const pathname = usePathname();

  const router = useRouter()

  useEffect(() => {
    // if (isClient && auth && auth.role != "restaurant") {
    //   router.replace("/")
    // }

  }, [isClient,auth])

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Automatically collapse sidebar on mobile
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    handleResize(); // Check on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);



  return (
    <>
      {!isClient && <Loader />}
      <div className="relevent flex justify-left overflow-hidden z-0">
        <button
          className="fixed text-white mb-4 p-2 h-10 w-10 max-h-[10%] rounded-full bg-gray-700 hover:bg-gray-600 z-100 inset-0 md:inset-y-96 md:inset-x-0 md:top-0 md:right-0 md:mr-5 mt-24 md:mt-24 ml-1 md:ml-10"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <>
            <IoMdClose size={24} />


          </> : <IoMdMenu size={24} />}
        </button>
        <AnimatePresence initial={false}>
          {isSidebarOpen ? (
            <motion.div
              initial={{ y: "100%", opacity: 0 }} // Start from off-screen right
              animate={{ y: 0, opacity: 1 }} // Slide into view
              exit={{ y: "100%", opacity: 0 }} // Slide out to the right
              transition={{ duration: 0.4, ease: "easeInOut" }} // Smooth transition
              key="sidebar"
              className="fixed top-20 left-10 h-full w-full p-6 z-50"
            >
              <div
                className={`flex flex-col p-4 max-h-[75%] min-h-[75%] mr-5 transition-all rounded-3xl shadow-custom bg-body_light dark:bg-body_dark duration-300 ${isSidebarOpen ? "w-3/4 md:w-1/5 overflow-auto no-scrollbar" : "w-0 hidden"}`}
              >
                {
                  isSidebarOpen && routes.map((route, index) => (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.4,
                        scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
                      }} key={index} className="pt-4 text-white text-left">

                      <LinkButton label={route.name} path={route.path} active={pathname.includes(route.path)} />


                    </motion.div>
                  ))
                }
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
        <div className={`relevent flex flex-wrap top-0 gap-4 h-[65vh] p-2 mt-8 z-60 justify-left transition-all duration-300  ${isSidebarOpen ? "w-0 ml-[22%] hidden md:block md:w-5/6" : "ml-0 w-full"}  overflow-auto text-black dark:text-white`}>
          {children}
        </div>
      </div>
    </>
  );
}