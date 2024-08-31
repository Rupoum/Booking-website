import { Datecard } from "@/components/booking/Datecard";
import CinemaDetails from "@/components/CinemaDetails/CinemaDetails";
import React from "react";
import Navbar from "@/components/Home/Navbar";
import Footer from "@/components/Home/Footer";
const page = ({ params }: any) => {
  // console.log(params.id)
  // console.log(params.id.name);
  return (
    <div>
      <Navbar />
      <CinemaDetails movieId={params.id} />
      <Footer />
      {/* cinema detaoils {params.id} */}
    </div>
  );
};

export default page;
