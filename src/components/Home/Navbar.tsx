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

const HeaderNav = () => {
  const [droppdown, setdropdown] = useState(false);
  const togglerdropdown = () => {
    setdropdown(!droppdown);
  };
  return (
    <Navbar
      shouldHideOnScroll
      isBlurred={true}
      className="h-14 px-16  z-10 text-black"
    >
      <NavbarBrand>
        <p className="font-bold text-inherit">LOGO</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Logout />

          {/* <h2>hello2</h2> */}
        </NavbarItem>
        <NavbarItem>
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
