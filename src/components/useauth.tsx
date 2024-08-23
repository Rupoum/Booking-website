// components/withAuth.tsx
"use client"
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function withAuth(Component: React.ComponentType, requiredRole: string) {
  return function AuthenticatedComponent(props: any) {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem("authtoken");

      if (!token) {
        router.push("/sign-up"); // Redirect to login if no token
        return;
      }

      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decoding JWT token
        const userRole = decodedToken.role;
           console.log(userRole);
        if (userRole === requiredRole) {
          setIsAuthorized(true); // Allow access if role matches
        } else {
          router.push("/"); // Redirect if role does not match
        }
      } catch (error) {
        console.error("Invalid token:", error);
        router.push("/sign-up"); // Redirect to login if token is invalid
      }
    }, [router]);

    if (!isAuthorized) {
      return null; // Optionally render a loading or unauthorized message
    }

    return <Component {...props} />;
  };
}

