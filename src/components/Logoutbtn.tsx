"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ShoppingBag, User } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { jwtDecode } from "jwt-decode"; // Corrected import

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ModeToggle } from "./ui/themeToggle";

export default function Logout() {
  const [userId, setUserId] = useState<string | null>(null); // Changed to string | null
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authtoken");

    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        setUserId(decodedToken.id);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("authtoken");
    setUserId(null);
  };

  const handleClick = () => {
    if (userId) {
      router.push(`/my-profile/orders/${userId}`);
    }
  };

  return (
    <div className="relative">
      {userId === null ? (
        <Link href={"/sign-up"}>
          <Button>Login</Button>
        </Link>
      ) : (
        <Sheet>
          <SheetTrigger asChild>
            <Button variant={"ghost"}>
              <User />
            </Button>
          </SheetTrigger>
          <SheetContent className="flex flex-col h-full px-0 w-[300px] sm:w-[540px] dark:bg-gray-700 dark:backdrop-filter dark:backdrop-blur-xl dark:bg-opacity-20">
            <SheetHeader className="flex mt-5">
              <div className="flex items-center justify-between px-5">
                <div>
                  <SheetTitle>Hey, User</SheetTitle>
                </div>
                <div className="sm:hidden block">
                  <ModeToggle />
                </div>
              </div>
            </SheetHeader>
            <div
              className="mt-5 gap-5 flex items-center cursor-pointer px-7 hover:bg-gray-200 dark:hover:bg-gray-900 transition-colors duration-200 w-full p-2"
              onClick={handleClick} // Use handleClick function
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
            <div className="mt-auto" />
            <div className="flex justify-center mb-5">
              <Button variant="destructive" onClick={logout}>
                <Link href={"/login"}>Sign Out</Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
}
