import { CinemaBooking } from "@/components/booking/CinemaBooking";
import Date from "@/components/booking/Date";
import MovieDetails from "@/components/booking/MovieDetails";
import StraightScreen2 from "@/components/booking/StraightScreen2";
import { Button } from "@/components/ui/button";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
const page = () => {
  return (
    <div className=" ">
      <MovieDetails />
      <Date />
      <div className="flex flex-col justify-center items-center mt-10 ">
        <CinemaBooking />
        <div className="mt-10">
          <StraightScreen2 />
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button className="my-5">Checkout</Button>
          </SheetTrigger>
          <SheetContent side={"bottom"} className="w-full h-1/3">
            <SheetHeader>
              <SheetTitle>Are you absolutely sure?</SheetTitle>
              <SheetDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default page;
