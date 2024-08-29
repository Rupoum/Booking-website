import { CinemaBooking } from "@/components/booking/CinemaBooking";
import { Datecard } from "@/components/booking/Datecard";
import MovieDetails from "@/components/booking/MovieDetails";
import React from "react";

const page = ({ params }: any) => {
  // console.log(params.id)
  // console.log(params.id.rows);
  return (
    <div>
      <div className="w-full h-32 py-5">
        <MovieDetails screenId={params.id} />
      </div>
      <div className="px-24">
        <Datecard />
      </div>
      <div className="mt-10">
        <CinemaBooking screenId={params.id} />
      </div>
    </div>
  );
};

export default page;
