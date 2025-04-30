"use client";

import Loader from "@/components/Loader/Loader";
import { useAppSelector } from "@/lib/hooks";
import { useEffect, useState, Component } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Fade } from "react-awesome-reveal";
import Link from "next/link";
import Button from "@/components/Button/Button";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CLARITY, CONFIDENCE, CONSISTENCY, EFFICIENCY } from "@/utils/icons";
import Slider from "react-slick"
import HomePage from "@/views/Home/Home";

interface DataType {
  profession: string;
  name: string;
  comment: string;
}


export default function Home() {
  const [isClient, setIsClient] = useState(false)
  const router = useRouter()
  useEffect(() => {
    setIsClient(true)
  }, [])

 

  return (
    <>
      {!isClient && <Loader />}
      <HomePage/>
    </>
  );
}
