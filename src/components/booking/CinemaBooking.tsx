"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import SquareElem2 from "./SquareElem2";

export const CinemaBooking = () => {
  const [rows, setRows] = useState<number>(0);
  const [columns, setColumns] = useState<number>(0);

  useEffect(() => {
    const fetchSeatDetails = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/screen/screen/cinema/66cb841556fe12d3cd890a9a/seat"
        );

        const { rows, columns } = response.data;
        setRows(rows);
        setColumns(columns);
      } catch (error) {
        console.error("Error fetching seat details:", error);
      }
    };

    fetchSeatDetails();
  }, []);

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
