"use client";
import React, { useState, useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import {
  Clapperboard,
  Plus,
  Projector,
  ShoppingBag,
  User,
  UsersRound,
} from "lucide-react";
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

export default function LogoutAdmin() {
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
      <Suspense>
        {user.value === "" ? (
          <Link href={"/admin/signup"}>
            <Button>Login</Button>
          </Link>
        ) : (
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
                    <SheetTitle>Hey! Admin </SheetTitle>
                  </div>
                  <div className="sm:hidden block">
                    <ModeToggle />
                  </div>
                </div>
              </SheetHeader>
              <div
                className="mt-5 gap-5 flex items-center cursor-pointer px-7 hover:bg-gray-200 dark:hover:bg-gray-900 transition-colors duration-200 w-full p-2" // Added w-full and p-2
                onClick={() => (window.location.href = "/admin/cinema")} // Redirect on click
              >
                <div>
                  <Plus className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-gray-900 dark:text-white">Create Cinema</p>
                  <span className="text-xs text-gray-500 dark:text-gray-300">
                    Create cinema
                  </span>
                </div>
              </div>
              <div
                className="mt-5 gap-5 flex items-center cursor-pointer px-7 hover:bg-gray-200 dark:hover:bg-gray-900 transition-colors duration-200 w-full p-2" // Added w-full and p-2
                onClick={() => (window.location.href = "/admin/movie")} // Redirect on click
              >
                <div>
                  <Plus className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-gray-900 dark:text-white">Create Movie</p>
                  <span className="text-xs text-gray-500 dark:text-gray-300">
                    Create Movie
                  </span>
                </div>
              </div>
              <div
                className="mt-5 gap-5 flex items-center cursor-pointer px-7 hover:bg-gray-200 dark:hover:bg-gray-900 transition-colors duration-200 w-full p-2" // Added w-full and p-2
                onClick={() => (window.location.href = "/admin/show")} // Redirect on click
              >
                <div>
                  <Plus className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-gray-900 dark:text-white">
                    Create Showtime
                  </p>
                  <span className="text-xs text-gray-500 dark:text-gray-300">
                    Create Showtime
                  </span>
                </div>
              </div>
              <div
                className="mt-5 gap-5 flex items-center cursor-pointer px-7 hover:bg-gray-200 dark:hover:bg-gray-900 transition-colors duration-200 w-full p-2" // Added w-full and p-2
                onClick={() => (window.location.href = "/admin/allUsers")} // Redirect on click
              >
                <div>
                  <UsersRound className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-gray-900 dark:text-white">
                    Details of Users
                  </p>
                  <span className="text-xs text-gray-500 dark:text-gray-300">
                    Get all the details of the user
                  </span>
                </div>
              </div>
              <div
                className="mt-5 gap-5 flex items-center cursor-pointer px-7 hover:bg-gray-200 dark:hover:bg-gray-900 transition-colors duration-200 w-full p-2" // Added w-full and p-2
                onClick={() => (window.location.href = "/admin/listmovie")} // Redirect on click
              >
                <div>
                  <Clapperboard className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-gray-900 dark:text-white">All Movies</p>
                  <span className="text-xs text-gray-500 dark:text-gray-300">
                    Get all the Movies
                  </span>
                </div>
              </div>
              <div
                className="mt-5 gap-5 flex items-center cursor-pointer px-7 hover:bg-gray-200 dark:hover:bg-gray-900 transition-colors duration-200 w-full p-2" // Added w-full and p-2
                onClick={() => (window.location.href = "/admin/listcinema")} // Redirect on click
              >
                <div>
                  <Projector className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-gray-900 dark:text-white">All Cinemas</p>
                  <span className="text-xs text-gray-500 dark:text-gray-300">
                    Get all the Cinemas
                  </span>
                </div>
              </div>
              {/* Spacer to push the button to the bottom */}
              <div className="mt-auto" />{" "}
              {/* This empty div will take up the remaining space */}
              <div className="flex justify-center mb-5">
                <Link href={"/admin/login"}>
                  <Button variant="destructive" onClick={logout}>
                    Sign Out
                  </Button>{" "}
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        )}
      </Suspense>
    </div>
  );
}
