import { Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="px-20 md:px-44 w-full h-auto  mt-36" suppressHydrationWarning>
      <div className="flex flex-row  flex-wrap  gap-10 md:flex-row justify-between">
        <div className="mt-10">
          <h6 className="text-sm">PROFILE</h6>
          <div className="flex flex-col mt-2 gap-2 text-gray-400 text-xs">
            <Link href="#">FAQ's</Link>
            <Link href="#">Pricing Plans</Link>
            <Link href="#">Order Tracking</Link>
            <Link href="#">Returns</Link>
          </div>
        </div>
        <div className="mt-10">
          <h5 className="text-sm">RECENT POSTS</h5>
          <div className="flex flex-col mt-2 gap-2 text-gray-400 text-xs">
            <Link href="#">Touch of Uniqueness</Link>
            <Link href="#">Offices You Won't Forget</Link>
            <Link href="#">Cicilan</Link>
          </div>
        </div>
        <div className="mt-10">
          <h5 className="text-sm">CUSTOMER</h5>
          <div className="flex flex-col mt-2 gap-2 text-gray-400 text-xs">
            <Link href="#">Help & Contact Us</Link>
            <Link href="#">Return</Link>
            <Link href="#">Terms & Conditions</Link>
          </div>
        </div>
        <div className="mt-10">
          <h5 className="text-sm">CONTACT</h5>
          <div className="flex gap-3 mt-2 text-gray-400 text-xs">
            <Link href="#">
              <Instagram />
            </Link>
            <Link href="#">
              <Twitter />
            </Link>
            <Link href="#">
              <Facebook />
            </Link>
          </div>
        </div>
      </div>
      <div className="self-stretch w-full h-[1px] bg-gray-400 my-10"></div>
    </div>
  );
};

export default Footer;
