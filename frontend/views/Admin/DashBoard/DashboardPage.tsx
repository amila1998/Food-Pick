"use client";

import React, { useEffect, useState } from "react";
import Loader from "@/components/Loader/Loader";
import ResizeObserver from "resize-observer-polyfill";
import { motion } from "framer-motion";
import DynamicChart from "@/components/DynamicChart/DynamicChart";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15 },
  }),
};

const DashboardPage: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const [containerWidths, setContainerWidths] = useState<number[]>([]);
  const chartRefs = useState(() => Array(5).fill(null).map(() => React.createRef<HTMLDivElement>()))[0];
  const [highlights, setHighlights] = useState<any>([
    {
      title: "Total Users",
      subTitle: "",
      total: 100,
      valueType: "COUNT",
      subCategories: []
    },
    {
      title: "Total Items",
      subTitle: "",
      total: 100,
      valueType: "COUNT",
      subCategories: []
    },
    {
      title: "Total Revenue",
      subTitle: "",
      total: 100,
      valueType: "PRICE",
      subCategories: []
    },
  ]);
  useEffect(() => {
    setIsClient(true);
    const observers = chartRefs.map((ref, idx) => {
      const observer = new ResizeObserver((entries: any) => {
        for (let entry of entries) {
          setContainerWidths(prev => {
            const updated = [...prev];
            updated[idx] = entry.contentRect.width;
            return updated;
          });
        }
      });
      if (ref.current) observer.observe(ref.current);
      return observer;
    });
    return () => observers.forEach((observer, idx) => {
      if (chartRefs[idx].current) observer.unobserve(chartRefs[idx].current!);
    });
  }, [chartRefs]);

  const charts = [
    {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May"],
        datasets: [
          {
            label: "Revenue",
            data: [500, 700, 900, 650, 800],
            borderColor: "#3b82f6",
            backgroundColor: "#93c5fd",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { title: { display: true, text: "Monthly Revenue" } },
      },
    },
 
  ];

  return (
    <>
      {!isClient && <Loader />}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
        className="w-full flex flex-col gap-6"
      >
        <motion.h2 className="text-2xl font-bold" variants={fadeIn} custom={0}>
          Dashboard
        </motion.h2>

        {
          highlights && highlights.length > 0 &&
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            variants={fadeIn}
            custom={1}
          >
            {highlights.map((highlight: any, index: number) => (
              <motion.div
                key={index}
                ref={chartRefs[index]}
                className="bg-body_light dark:bg-body_dark p-4 rounded-xl shadow-md h-20"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                custom={index + 2}
              >
                <div key={index} className=''>
                  <h3 className='text-[14px] font-bold text-left'>{highlight.title}</h3>
                  <h3 className='text-2xl font-bold text-right'>{highlight.total}</h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        }
        {
          charts && charts.length > 0 &&

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            variants={fadeIn}
            custom={1}
          >
            {charts.map((chart: any, index) => (
              <motion.div
                key={index}
                ref={chartRefs[index]}
                className="bg-body_light dark:bg-body_dark p-4 rounded-xl shadow-md h-72"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                custom={index + 2}
              >
                <DynamicChart chart={chart} />
              </motion.div>
            ))}
          </motion.div>
        }
      </motion.div>
    </>
  );
};

export default DashboardPage;
