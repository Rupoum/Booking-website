"use client";
import React from "react";
import { RecoilRoot } from "recoil";
import { ListMovies } from "../../../components/templates/ListMovies";
// import ProtectedRoute from "@/components/atoms/protecting";
import { withAuth } from "@/components/useauth";
// import CreateCinemaPage from "@/components/temp/createc";
function Cinema() {
  return (
    <RecoilRoot>
      {/* <ProtectedRoute requiredRole="Customer">
     
      </ProtectedRoute> */}
      <div className="flex justify-center items-center ">
        <ListMovies />
        {/* <CreateCinemaPage /> */}
      </div>
    </RecoilRoot>
  );
}
export default withAuth(Cinema, "Admin");
