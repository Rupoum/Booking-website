"use client";
import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import Link from "next/link";
import { Button } from "../ui/button";
import { User } from "lucide-react";
import { ModeToggle } from "../ui/themeToggle";
import Logout from "../Logoutbtn";
import { RecoilRoot } from "recoil";
// import StaggeredDropDown from "../Profile";

const HeaderNav = () => {
  const [droppdown, setdropdown] = useState(false);
  const togglerdropdown = () => {
    setdropdown(!droppdown);
  };
  return (
    <Navbar
      shouldHideOnScroll
      isBlurred={true}
      className="h-14 sm:px-16 px-4  z-10 text-black dark:bg-transparent dark:text-white"
    >
      <NavbarBrand>
        <Link href={"/"}>
          <p className="font-bold text-inherit">LOGO</p>
        </Link>
      </NavbarBrand>
      <NavbarContent className=" sm:flex gap-4" justify="center">
        <NavbarItem>
          <Logout />

          {/* <h2>hello2</h2> */}
        </NavbarItem>
        <NavbarItem className="hidden sm:block">
          <ModeToggle />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default HeaderNav;
{
  /* <NavbarContent justify="center">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">
            {/* <User onMouseOver={togglerdropdown} onMouseLeave={togglerdropdown}  /> */
}
// </Link>
// <Logout />
// </NavbarItem>
// <NavbarItem>
{
  /* <ModeToggle /> */
}
{
  /* </NavbarItem> */
}
// </NavbarContent> */}
