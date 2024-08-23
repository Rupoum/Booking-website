
import React,{useState} from "react";
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
import { ModeToggle } from "../ui/themeToggle"
import Logout from "../Logoutbtn";
import { RecoilRoot } from "recoil";


const HeaderNav = () => {
  const [droppdown, setdropdown] = useState(false)
  const togglerdropdown=()=>{
      setdropdown(!droppdown)
  }  
  return (
    <Navbar 
      shouldHideOnScroll
      isBlurred={true}
      className="h-14 px-16 bg-transparent absolute z-10 text-white"suppressHydrationWarning

    >
      <NavbarBrand>
        <p className="font-bold text-inherit">LOGO</p>
      </NavbarBrand>
      <NavbarContent

        className="hidden sm:flex gap-4"
        justify="center"
      ></NavbarContent>
      
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">
            {/* <User onMouseOver={togglerdropdown} onMouseLeave={togglerdropdown}  /> */}
          </Link>
          <Logout/>
          <NavbarItem> </NavbarItem>
        </NavbarItem>
        <NavbarItem>
          <ModeToggle />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default HeaderNav;
