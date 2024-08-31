"use client";
import Image from "next/image";
import BackgroundImage from "../../../public/assets/coverBg.png";
import HeaderNavAdmin from "@/components/Home/NavbarAdmin";
import { Suspense } from "react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="">
      {/* <HeaderNavAdmin /> */}
      <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
    </div>
  );
}
