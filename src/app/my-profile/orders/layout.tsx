"use client";
import Navbar from "@/components/Home/Navbar";
import Footer from "@/components/Home/Footer";
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div suppressHydrationWarning>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
