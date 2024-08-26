"use client";
import Image from "next/image";
import BackgroundImage from "../../../public/assets/coverBg.png";
import HeaderNavAdmin from "@/components/Home/NavbarAdmin";
import { Toaster } from "@/components/ui/toaster";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="">
      <HeaderNavAdmin />
      {children}
      <Toaster />
    </div>
  );
}
