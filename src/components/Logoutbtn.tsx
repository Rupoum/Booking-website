"use client";
import React, { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { User } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

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
        <div className="flex items-center">
          <button onClick={toggleDropdown} className="flex items-center">
            <User className="cursor-pointer" />
          </button>
          {dropdown && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-2 px-6 rounded-lg bg-white shadow-xl z-20 absolute top-[120%] right-[100%] w-48 overflow-hidden"
            >
              <Link href={"/profile"}>
                <motion.div
                  className="py-1 hover:text-gray-700 text-sm cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.9 }}
                >
                  My Profile
                </motion.div>
              </Link>
              <Link href={"/history"}>
                <motion.div
                  className="py-1 hover:text-gray-700  text-sm cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 1.0 }}
                >
                  History
                </motion.div>
              </Link>
              <Link href={"/login"}>
                <motion.div
                  className="py-1 hover:text-gray-700  text-sm cursor-pointer"
                  onClick={logout}
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 1.2 }}
                >
                  Logout
                </motion.div>
              </Link>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}
