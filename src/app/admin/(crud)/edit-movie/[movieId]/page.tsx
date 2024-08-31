import EditMovie from "@/components/Edit/EditMovie";
import React from "react";

const Page = ({ params }: { params: { movieId: string } }) => {
  // console.log(params.movieId); // This will log the movieId to the console

  return (
    <div>
      <EditMovie movieId={params.movieId} /> {/* Pass the movieId correctly */}
    </div>
  );
};

export default Page;
