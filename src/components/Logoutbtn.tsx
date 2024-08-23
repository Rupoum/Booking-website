'use client';
import React, { useState, useEffect } from "react";
// import Logoutnav from "./navbarlogout";
import { usePathname, useSearchParams } from "next/navigation";
import { User } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Logout() {
  const [user, setUser] = useState({ value: "" });
  const [key, setKey] = useState(0);
  const [dropdown, setDropdown] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = localStorage.getItem("authtoken");
    if (token) {
      setUser({ value: token });
      setKey(Math.random());
    }
  }, [pathname, searchParams]);

  const logout = () => {
    localStorage.removeItem("authtoken");
    setUser({ value: "" });
    setKey(Math.random());
  };

  return (
    <div suppressHydrationWarning>
      {user.value === "" ? (
        <Link href={'/sign-up'}>
          <Button suppressHydrationWarning>
            Login
          </Button>
        </Link>
      ) : (
        <div className="cursor-pointer items-center absolute right-0 top-4 mx-5 flex" suppressHydrationWarning>
          <div
            onMouseOver={() => setDropdown(true)}
            onMouseLeave={() => setDropdown(false)}
            className="relative"
          >
            <User className="text-xl md:text-2xl mx-2" />
            {dropdown && (
              <div
                onMouseOver={() => setDropdown(true)}
                onMouseLeave={() => setDropdown(false)}
                className="absolute right-0 bg-pink-300 top-6 rounded-md px-5 w-36"
              >
                <ul>
                  <Link href={'/profile'}>
                    <div className="py-1 hover:text-blue-700 text-sm">My profile</div>
                  </Link>
                  <Link href={'/history'}>
                    <div className="py-1 hover:text-blue-700 text-sm">History</div>
                  </Link>
                  <Link href={'/login'}>
                  <div
                    className="py-1 hover:text-blue-700 text-sm cursor-pointer"
                    onClick={logout}
                  >
                    Logout
                    
                  </div>
                  </Link>
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
