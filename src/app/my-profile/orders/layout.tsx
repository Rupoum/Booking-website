"use client";
import Navbar from "@/components/Home/Navbar";
import Footer from "@/components/Home/Footer";
import { Suspense } from "react";
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div suppressHydrationWarning>
      <Suspense>
        <Navbar />

        {children}
        <Footer />
      </Suspense>
    </div>
  );
}
