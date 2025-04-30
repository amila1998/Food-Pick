"use client";

import Loader from '@/components/Loader/Loader';
import { auth } from '@/lib/firebaseConfig';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2 },
  }),
};

const ProfilePage: React.FC = () => {
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const authUser = auth.currentUser;

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!authUser) return;
    if (userId && userId === authUser.uid) {
      setUser(authUser);
      setIsLoading(false);
    }
  }, [userId, authUser]);

  useEffect(() => {
    if (user?.displayName) {
      document.title = `${user.displayName}'s Profile | FOOD PICK`;
    } else {
      document.title = `Profile | FOOD PICK`;
    }
  }, [user]);

  if (!isClient || isLoading) return <Loader />;

  return (
    <div className="w-full min-h-screen p-6 bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden p-6"
      >
        <motion.div
          className="flex flex-col items-center"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0}
        >
          <Image
            src={user?.photoURL ?  process.env.NEXT_PUBLIC_BASE_URL +  user.photoURL : '/assets/default-avatar-icon.jpg'}
            alt="Profile"
            width={120}
            height={120}
            className="rounded-full border-4 border-primary shadow-lg"
             loading="lazy"
          />
          <motion.h1 className="text-2xl font-bold mt-4" variants={fadeUp} custom={1}>
            {user?.displayName}
          </motion.h1>
          <motion.p className="text-gray-600 dark:text-gray-300" variants={fadeUp} custom={2}>
            {user?.email}
          </motion.p>
        </motion.div>

        <motion.div className="mt-6" variants={fadeUp} custom={3}>
          <h2 className="text-xl font-semibold border-b border-gray-300 pb-2 mb-4">Profile Summary</h2>
          <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
            Passionate individual eager to learn and grow in the sales and leadership space. Enthusiastic about
            building scalable systems and contributing to the mission of FOOD PICK.
          </p>
        </motion.div>

        <motion.div className="mt-6" variants={fadeUp} custom={4}>
          <h2 className="text-xl font-semibold border-b border-gray-300 pb-2 mb-4">Contact</h2>
          <ul className="text-sm space-y-1">
            <li><strong>Email:</strong> {user?.email}</li>
            {user?.phoneNumber && <li><strong>Phone:</strong> {user.phoneNumber}</li>}
          </ul>
        </motion.div>

        <motion.div className="mt-6" variants={fadeUp} custom={5}>
          <h2 className="text-xl font-semibold border-b border-gray-300 pb-2 mb-4">Skills</h2>
          <ul className="flex flex-wrap gap-2 text-sm">
            {['Leadership', 'Sales', 'Coaching', 'Communication'].map((skill, i) => (
              <motion.li
                key={skill}
                className="bg-primary text-white px-3 py-1 rounded-full"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
              >
                {skill}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div className="mt-6" variants={fadeUp} custom={6}>
          <h2 className="text-xl font-semibold border-b border-gray-300 pb-2 mb-4">Education & Experience</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <p className="font-medium">Bachelor&apos;s Degree in Business Management</p>
              <p className="text-gray-500 dark:text-gray-400">University of Somewhere - 2018</p>
            </li>
            <li>
              <p className="font-medium">Sales Executive at FOOD PICK</p>
              <p className="text-gray-500 dark:text-gray-400">2021 - Present</p>
            </li>
          </ul>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;
