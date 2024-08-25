"use client";
import React from "react";
import { RecoilRoot } from "recoil";
import { SelectShowtimes } from "../../components/templates/SelectShows";
// import ProtectedRoute from "@/components/atoms/protecting";
import { withAuth } from "@/components/useauth";
// import CreateCinemaPage from "@/components/temp/createc";
 function Cinema() {
  return (
    <RecoilRoot>
      {/* <ProtectedRoute requiredRole="Customer">
     
      </ProtectedRoute> */}
      <div className="flex justify-center items-center ">
        <SelectShowtimes cinemaId={"66c6333e1aeb3f8cd7cd2581"} movieId={"66c9dc1e11670d15dd271190"} >
            
        </SelectShowtimes>
        {/* <CreateCinemaPage /> */}
      </div>
    </RecoilRoot>
  );
} export default withAuth(Cinema,"Admin");
