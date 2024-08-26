"use client";
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import SquareElem2 from "./SquareElem2";
import { Skeleton } from "@/components/ui/skeleton"; // Ensure this path is correct

export const CinemaBooking = () => {
  const [rows, setRows] = useState<number>(0);
  const [columns, setColumns] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true); // Add loading state
  const [selectedSeats, setSelectedSeats] = useState<
    { row: number; column: number }[]
  >([]); // State to track selected seats
  const [hoverPrice, setHoverPrice] = useState<number>(0); // State to track price on hover

  useEffect(() => {
    const fetchSeatDetails = async () => {
      try {
        const response = await axios.get(
          "https://bookmyshowfinal.onrender.com/api/screen/screen/cinema/66cb841556fe12d3cd890a9a/seat"
        );

        const { rows, columns, price } = response.data;
        setRows(rows);
        setColumns(columns);
        setPrice(price);
      } catch (error) {
        console.error("Error fetching seat details:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchSeatDetails();
  }, []);

  const handleSelectSeat = (row: number, column: number) => {
    console.log(`Selected Seat - Row: ${row + 1}, Column: ${column + 1}`); // Log the selected seat
    setSelectedSeats((prev) => {
      // Toggle seat selection
      const isSelected = prev.some(
        (seat) => seat.row === row && seat.column === column
      );
      if (isSelected) {
        return prev.filter(
          (seat) => seat.row !== row || seat.column !== column
        ); // Deselect if already selected
      } else {
        return [...prev, { row, column }]; // Select the seat
      }
    });
  };

  const calculateTotalPrice = () => {
    return selectedSeats.length * price; // Calculate total price based on selected seats
  };

  const handleMouseEnter = useCallback(() => {
    setHoverPrice(calculateTotalPrice()); // Set hover price on mouse enter
  }, [selectedSeats, price]);

  const handleMouseLeave = useCallback(() => {
    setHoverPrice(0); // Reset hover price on mouse leave
  }, []);

  const renderRows = () => {
    const rowElements: JSX.Element[] = [];

    for (let i = 0; i < rows; i++) {
      const columnElements: JSX.Element[] = [];
      for (let j = 0; j < columns; j++) {
        const isSelected = selectedSeats.some(
          (seat) => seat.row === i && seat.column === j
        );
        columnElements.push(
          <SquareElem2
            key={`${i}-${j}`}
            row={i}
            column={j}
            onSelect={handleSelectSeat}
            selected={isSelected} // Pass selected state to SquareElem2
          />
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

  return (
    <div className="w-full">
      {loading ? (
        // Show skeletons while loading
        <div className="flex flex-col items-center gap-2">
          {Array.from({ length: 10 }).map((_, rowIndex) => (
            <div key={rowIndex} className="flex gap-4">
              {Array.from({ length: 10 }).map((_, colIndex) => (
                <Skeleton
                  key={`${rowIndex}-${colIndex}`}
                  className="w-5 h-5 bg-gray-200" // Add a background color for visibility
                />
              ))}
            </div>
          ))}
        </div>
      ) : (
        <>
          {renderRows()} {/* Render the rows if not loading */}
          {/* <div className="mt-4">
            <div className="text-lg font-bold">
              Total Price: ${calculateTotalPrice().toFixed(2)}
            </div>
          </div>
          <div className="mt-4">
            <button
              className="p-2 bg-blue-500 text-white rounded"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Checkout
            </button>
            {hoverPrice > 0 && (
              <div className="mt-2 text-lg font-bold">
                Hover Price: ${hoverPrice.toFixed(2)}
              </div>
            )}
          </div> */}
        </>
      )}
    </div>
  );
};
