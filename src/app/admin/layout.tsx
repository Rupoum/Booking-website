"use client";
import Image from "next/image";
import BackgroundImage from "../../../public/assets/coverBg.png";
import HeaderNavAdmin from "@/components/Home/NavbarAdmin";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="">
      <HeaderNavAdmin />
      {children}
    </div>
  );
}
