"use client"
import React from "react";
import { RecoilRoot } from "recoil";
import Signup from "@/components/adminregister";

const page = () => {
  return (
    <RecoilRoot> <Signup/></RecoilRoot>
   
  );
};

export default page;
