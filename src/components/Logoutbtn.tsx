"use client";
import React, { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { ShoppingBag, User } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ModeToggle } from "./ui/themeToggle";

export default function Logout() {
  const [user, setUser] = useState({ value: "" });
  const [dropdown, setDropdown] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = localStorage.getItem("authtoken");
    if (token) {
      setUser({ value: token });
    }
  }, [pathname, searchParams]);

  const logout = () => {
    localStorage.removeItem("authtoken");
    setUser({ value: "" });
    setDropdown(false); // Close dropdown on logout
  };

  const toggleDropdown = () => {
    setDropdown((prev) => !prev);
  };

  return (
    <div className="relative">
      {user.value === "" ? (
        <Link href={"/sign-up"}>
          <Button>Login</Button>
        </Link>
      ) : (
        // <div className="flex items-center">
        //   <button onClick={toggleDropdown} className="flex items-center">
        //     <User className="cursor-pointer" />
        //   </button>
        //   {dropdown && (
        //     <motion.div
        //       initial={{ opacity: 0, y: -10 }}
        //       animate={{ opacity: 1, y: 0 }}
        //       exit={{ opacity: 0, y: -10 }}
        //       transition={{ duration: 0.4 }}
        //       className="flex flex-col gap-2 px-6 rounded-lg bg-white shadow-xl z-20 absolute top-[120%] right-[100%] w-48 overflow-hidden"
        //     >
        //       <Link href={"/profile"}>
        //         <motion.div
        //           className="py-1 hover:text-gray-700 text-sm cursor-pointer"
        //           whileHover={{ scale: 1.05 }}
        //           initial={{ opacity: 0, y: -20 }}
        //           animate={{ opacity: 1, y: 0 }}
        //           exit={{ opacity: 0, y: -20 }}
        //           transition={{ duration: 0.9 }}
        //         >
        //           My Profile
        //         </motion.div>
        //       </Link>
        //       <Link href={"/history"}>
        //         <motion.div
        //           className="py-1 hover:text-gray-700  text-sm cursor-pointer"
        //           whileHover={{ scale: 1.05 }}
        //           initial={{ opacity: 0, y: -30 }}
        //           animate={{ opacity: 1, y: 0 }}
        //           exit={{ opacity: 0, y: -30 }}
        //           transition={{ duration: 1.0 }}
        //         >
        //           History
        //         </motion.div>
        //       </Link>
        //       <Link href={"/login"}>
        //         <motion.div
        //           className="py-1 hover:text-gray-700  text-sm cursor-pointer"
        //           onClick={logout}
        //           whileHover={{ scale: 1.05 }}
        //           initial={{ opacity: 0, y: -30 }}
        //           animate={{ opacity: 1, y: 0 }}
        //           exit={{ opacity: 0, y: -30 }}
        //           transition={{ duration: 1.2 }}
        //         >
        //           Logout
        //         </motion.div>
        //       </Link>
        //     </motion.div>
        //   )}
        // </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant={"ghost"}>
              <User />
            </Button>
          </SheetTrigger>
          <SheetContent className="flex flex-col h-full px-0 w-[300px] sm:w-[540px]  dark:bg-gray-700  dark:backdrop-filter drak:backdrop-blur-xl dark:bg-opacity-20">
            <SheetHeader className="flex mt-5">
              <div className="flex items-center justify-between px-5">
                <div>
                  <SheetTitle>Hey! user name</SheetTitle>
                </div>
                <div className="sm:hidden block">
                  <ModeToggle />
                </div>
              </div>
            </SheetHeader>
            <div
              className="mt-5 gap-5 flex items-center cursor-pointer px-7 hover:bg-gray-200 dark:hover:bg-gray-900 transition-colors duration-200 w-full p-2" // Added w-full and p-2
              onClick={() => (window.location.href = "/my-profile/orders")} // Redirect on click
            >
              <div>
                <ShoppingBag className="h-5 w-5" />
              </div>
              <div>
                <p className="text-gray-900 dark:text-white">Your Orders</p>
                <span className="text-xs text-gray-500 dark:text-gray-300">
                  View all your bookings & purchases
                </span>
              </div>
            </div>
            {/* Spacer to push the button to the bottom */}
            <div className="mt-auto" />{" "}
            {/* This empty div will take up the remaining space */}
            <div className="flex justify-center mb-5">
              <Button variant="destructive">
                <Link href={"/login"}>Sign Out</Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
}
