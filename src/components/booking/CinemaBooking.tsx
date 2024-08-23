"use client";
import React from "react";
import SquareElem2 from "./SquareElem2";

export const CinemaBooking = ({
  rows,
  columns,
}: {
  rows: number;
  columns: number;
}) => {
  const renderRows = () => {
    const rowElements: JSX.Element[] = [];

    for (let i = 0; i < rows; i++) {
      const columnElements: JSX.Element[] = [];
      for (let j = 0; j < columns; j++) {
        columnElements.push(
          <SquareElem2 key={`${i}-${j}`} row={i} column={j} />
        );
      }
      rowElements.push(
        <div key={`row-${i}`} className="flex gap-4">
          {columnElements}
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center gap-2 px-2 overflow-x-auto">
        {rowElements}
      </div>
    );
  };

  return <div className="w-full ">{renderRows()}</div>;
};