"use client"
import React from "react";
import { RecoilRoot } from "recoil";
import Signup from "@/components/register";

const page = () => {
  return (
    <RecoilRoot> <Signup/></RecoilRoot>
   
  );
};

export default page;
