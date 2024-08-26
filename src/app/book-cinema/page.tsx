import Date from "@/components/booking/Date";
import MovieDetails from "@/components/booking/MovieDetails";

import { CinemaBooking } from "../../components/booking/CinemaBooking";

const page = () => {
  return (
    <div className=" ">
      <MovieDetails />
      <Date />
      <div className="flex flex-col justify-center items-center mt-10 ">
        <CinemaBooking />
      </div>
    </div>
  );
};

export default page;
