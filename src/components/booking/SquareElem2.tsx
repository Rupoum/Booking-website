"use client";
import React from "react";
import { cn } from "../../components/utils";

interface SquareElem2Props {
  booked?: boolean;
  selected?: boolean;
  row: number;
  column: number;
  onSelect?: (row: number, column: number) => void; // Make onSelect optional
}

const SquareElem2 = ({
  booked = false,
  selected = false,
  row,
  column,
  onSelect, // Add onSelect prop to handle seat selection
}: {
  booked?: boolean;
  selected?: boolean;
  row: number;
  column: number;
  onSelect: (row: number, column: number) => void; // Define the type for onSelect
}) => {
  const handleClick = () => {
    if (!booked && onSelect) {
      onSelect(row, column); // Call onSelect with row and column when clicked
    }
  };

  return (
    <div className="flex items-center">
      {/* Show row letter only for the first box in each row */}
      {column === 0 && (
        <span className="text-sm mr-10 text-gray-500">{`${String.fromCharCode(
          65 + row
        )}`}</span>
      )}
      <div
        onClick={handleClick} // Add click handler
        className={cn(
          "w-7 transition-all h-7 border border-green-400 dark:border-white text-green-400 shadow-md cursor-pointer hover:bg-green-600 hover:text-white flex items-center justify-center",
          booked ? "bg-gray-200 shadow-inner border-0" : "",
          selected
            ? "bg-green-400 text-white dark:bg-white p-1 border-0 shadow-black/30 shadow-lg"
            : ""
        )}
      >
        {/* Display column number inside the box */}
        <span className="text-xs">{`${column + 1}`}</span>{" "}
        {/* Adjusted to show 1-based index */}
      </div>
    </div>
  );
};

export default SquareElem2;
