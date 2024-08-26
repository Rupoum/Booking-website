import React from "react";

const Date = () => {
  // Define an array of times
  const times = [
    "10:00 AM",
    "12:00 PM",
    "02:00 PM",
    "04:00 PM",
    "06:00 PM",
    "08:00 PM",
  ];

  return (
    <div className="w-full h-16 bg-slate-100 flex items-center ">
      <div className="flex items-start gap-2 mx-8 ">
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
  );
};

export default Date;
