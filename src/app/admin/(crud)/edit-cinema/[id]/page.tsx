import React from "react";
import EditCinema from "../../../../../components/Edit/EditCinema";

const page = ({ params }: { params: { id: string } }) => {
  return (
    <div className="w-full px-28 py-24">
      <EditCinema cinemaId={params.id} />
    </div>
  );
};

export default page;
