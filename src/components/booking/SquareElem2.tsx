"use client"
import React from "react";
import { cn } from "../../components/utils";

const SquareElem2 = ({
  booked = false,
  selected = false,
  row,
  column,
}: {
  booked?: boolean;
  selected?: boolean;
  row: number;
  column: number;
}) => {
  return (
    <div className="flex  items-center ">
      {/* Show row number only for the first box */}
      {column === 0 && (
        <span className="text-sm mr-10 text-gray-500">{`${String.fromCharCode(
          65 + row
        )}`}</span>
      )}
      <div
        className={cn(
          "w-7 transition-all h-7 border border-green-400 dark:border-white text-green-400  shadow-md cursor-pointer hover:bg-green-600 hover:text-white flex items-center justify-center",
          booked ? "bg-gray-200 shadow-inner border-0" : "",
          selected
            ? "bg-primary-500 dark:bg-white p-1 border-0 shadow-black/30 shadow-lg"
            : ""
        )}
      >
        {/* Display column number inside the box */}
        <span className="text-xs">{`${column}`}</span>
      </div>
    </div>
  );
};

export default SquareElem2;