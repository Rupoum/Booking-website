"use client";
import React from "react";
import { RecoilRoot } from "recoil";
import { CreateCinema } from "../../components/templates/CreateCinema";
// import ProtectedRoute from "@/components/atoms/protecting";
import { withAuth } from "@/components/useauth";
// import CreateCinemaPage from "@/components/temp/createc";
function Cinema() {
  return (
    <RecoilRoot>
      {/* <ProtectedRoute requiredRole="Customer">
     
      </ProtectedRoute> */}
      <div className="flex justify-center items-center ">
        <CreateCinema />
        {/* <CreateCinemaPage /> */}
      </div>
    </RecoilRoot>
  );
}
export default Cinema;
