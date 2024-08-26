import { CinemaBooking } from "@/components/booking/CinemaBooking";
import Date from "@/components/booking/Date";
import StraightScreen2 from "@/components/booking/StraightScreen2";
import { Button } from "@/components/ui/button";
import React from "react";

const page = () => {
  return (
    <div className="mt-14">
      <Date />
      <div className="flex flex-col justify-center items-center my-20">
        <CinemaBooking  />
        <div className="mt-10">
          <StraightScreen2 />
        </div>
        <div className="mt-5">
          <Button>Checkout</Button>
        </div>
      </div>
    </div>
  );
};

export default page;
