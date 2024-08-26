import { CinemaBooking } from "@/components/booking/CinemaBooking";
import Date from "@/components/booking/Date";
import StraightScreen2 from "@/components/booking/StraightScreen2";
import React from "react";

const page = () => {
  return (
    <div className="mt-14">
      <Date />
      <div className="flex flex-col justify-center items-center my-20">
        <CinemaBooking rows={10} columns={20} />
        <div className="mt-10">
          <StraightScreen2 />
        </div>
      </div>
    </div>
  );
};

export default page;
