import { Datecard } from "@/components/booking/Datecard";
import CinemaDetails from "@/components/CinemaDetails/CinemaDetails";
import React from "react";

const page = ({ params }: any) => {
  // console.log(params.id)
  // console.log(params.id.name);
  return (
    <div>
      <CinemaDetails movieId={params.id} />
      {/* cinema detaoils {params.id} */}
    </div>
  );
};

export default page;
