import { Datecard } from "@/components/booking/Datecard";
import React from "react";

const page = () => {
  const movieName = "Stree";
  const times = [
    "10:00 AM",
    "12:00 PM",
    "02:00 PM",
    "04:00 PM",
    "06:00 PM",
    "08:00 PM",
    "10:00 AM",
    "12:00 PM",
    "02:00 PM",
    "04:00 PM",
    "06:00 PM",
    "08:00 PM",
    "10:00 AM",
    "12:00 PM",
    "02:00 PM",
    "04:00 PM",
    "06:00 PM",
    "08:00 PM",
    "02:00 PM",
    "04:00 PM",
    "06:00 PM",
    "08:00 PM",
    "10:00 AM",
    "12:00 PM",
    "02:00 PM",
    "04:00 PM",
    "06:00 PM",
    "08:00 PM",
    "10:00 AM",
    "12:00 PM",
    "02:00 PM",
    "04:00 PM",
    "06:00 PM",
    "08:00 PM",
  ];
  return (
    <div className="mt-20 border-2 border-gray-300">
      <div className="w-full h-32 flex flex-col justify-center  bg-gray-100">
        <div className="  sm:mx-40 mx-4 ">
          <h1 className=" font-sans text-4xl">{movieName}</h1>
          <div className="w-fit px-2 justify-center my-2 text-gray-500 py-2 flex items-center border-2 h-6  rounded-2xl border-gray-400  uppercase text-xs">
            comedy
          </div>
        </div>
      </div>

      <div className="w-full h-20 border-2  ">
        <div className="sm:ml-20 ml-14 flex items-center py-3 ">
          <Datecard />
        </div>
      </div>

      <div className="bg-gray-100 px-20 py-10 w-full h-[40rem]">
        <div className="w-full h-[32rem] bg-white  py-10">
          <div className="w-full min-h-48 max-h-fit py-5 border-y-2 ">
            <div className="flex   ">
              <div className="flex  items-start pl-12 pt-3 text-[0.9rem] font-semibold justify-start h-48 w-1/3 ">
                Atindra Cinema
              </div>
              <div className="flex  gap-x-1 flex-wrap w-2/3  ">
                {times.map((time, index) => (
                  <div
                    key={index}
                    className="w-24 h-10 border-2  text-green-400 font-mono hover:bg-green-400 hover:text-white cursor-pointer px-1 bg-slate-50 flex items-center justify-center rounded"
                  >
                    {time}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
