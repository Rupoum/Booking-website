"use client";
import React from "react";
import { RecoilRoot } from "recoil";
import { ListCinemas } from "../../../../components/templates/ListCinemas";
// import ProtectedRoute from "@/components/atoms/protecting";
import { withAuth } from "@/components/useauth";
import CinemaLists from "@/components/templates/CinemaLists";
// import CreateCinemaPage from "@/components/temp/createc";
function Cinema() {
  return (
    <RecoilRoot>
      {/* <ProtectedRoute requiredRole="Customer">
     
      </ProtectedRoute> */}
      <div className="flex justify-center items-center ">
        {/* <ListCinemas /> */}
        <CinemaLists />
        {/* <CreateCinemaPage /> */}
      </div>
    </RecoilRoot>
  );
}
export default withAuth(Cinema, "Admin");
