import React from "react";
import Navbar from "@/components/Home/Navbar";

import { Card } from "@/components/ui/card";

const page = ({ params }: any) => {
  return (
    <div>
      <Navbar />
      <div className="flex justify-center">
        My orders userID:{params.userId}
      </div>

      <div className="flex justify-center items-center mt-14">
        <Card
          className="relative w-96 h-96 flex  bg-cover bg-center cursor-pointer"
          style={{
            backgroundImage: `url('../../../../../assets/comingsoon.png')`,
          }}
        />
      </div>
    </div>
  );
};

export default page;
