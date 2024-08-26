"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import SquareElem2 from "@/components/booking/SquareElem2";
import { Skeleton } from "@/components/ui/skeleton";
import { loadStripe } from "@stripe/stripe-js";
import {jwtDecode} from "jwt-decode"; // Corrected the import statement
import StraightScreen2 from "./StraightScreen2";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export const CinemaBooking = () => {
  const [rows, setRows] = useState<number>(0);
  const [columns, setColumns] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [projectionType, setProjectionType] = useState<string>("");
  const [soundType, setSoundType] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedSeats, setSelectedSeats] = useState<
    { row: number; column: number }[]
  >([]);

  useEffect(() => {
    const fetchSeatDetails = async () => {
      try {
        const response = await axios.get(
          "https://bookmyshowfinal.onrender.com/api/screen/screen/cinema/66cb841556fe12d3cd890a9a/seat"
        );
        const { rows, columns, price, projectionType, soundType } =
          response.data;
        setRows(rows);
        setColumns(columns);
        setPrice(price);
        setProjectionType(projectionType);
        setSoundType(soundType);
      } catch (error) {
        console.error("Error fetching seat details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSeatDetails();
  }, []);

  const handleSelectSeat = (row: number, column: number) => {
    console.log(`Selected Seat - Row: ${row + 1}, Column: ${column + 1}`);
    setSelectedSeats((prev) => {
      const isSelected = prev.some(
        (seat) => seat.row === row && seat.column === column
      );
      if (isSelected) {
        return prev.filter(
          (seat) => seat.row !== row || seat.column !== column
        );
      } else {
        return [...prev, { row, column }];
      }
    });
  };

  const calculateTotalPrice = () => selectedSeats.length * price;

  const renderSelectedSeats = () => {
    return selectedSeats.map((seat, index) => (
      <span key={index}>
        {String.fromCharCode(65 + seat.row)}
        {seat.column + 1}
        {index < selectedSeats.length - 1 && ", "}
      </span>
    ));
  };

  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem("authtoken");

      if (!token) {
        throw new Error("Token not found");
      }

      const decodedToken: any = jwtDecode(token);
      const userId = decodedToken.id;

      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
      );

      const response = await axios.post(
        "http://localhost:5000/api/screen/payment",
        {
          userId: userId,
          seats: selectedSeats,
          price: calculateTotalPrice(),
        }
      );

      const { sessionId } = response.data;

      const result = await stripe?.redirectToCheckout({ sessionId });
      if (result?.error) {
        console.error("Stripe Checkout error:", result.error.message);
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

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
            selected={isSelected}
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
        <div className="flex flex-col items-center gap-2">
          {Array.from({ length: 10 }).map((_, rowIndex) => (
            <div key={rowIndex} className="flex gap-4">
              {Array.from({ length: 10 }).map((_, colIndex) => (
                <Skeleton
                  key={`${rowIndex}-${colIndex}`}
                  className="w-5 h-5 bg-gray-200"
                />
              ))}
            </div>
          ))}
        </div>
      ) : (
        <>
          {renderRows()}
          <div className="mt-10">
            <StraightScreen2 />
          </div>

          <div className="flex justify-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button className="my-5">Checkout</Button>
              </SheetTrigger>
              <SheetContent side={"bottom"} className="w-full h-1/3">
                <SheetHeader>
                  <SheetTitle>Are you absolutely sure?</SheetTitle>
                  <SheetDescription>
                    <div className="text-lg text-black">
                      Total Price:{" "}
                      <span>Rs {calculateTotalPrice().toFixed(2)}</span>
                    </div>
                    <div className="mt-1 text-lg text-black">
                      Selected Seats: {renderSelectedSeats() || "None"}
                    </div>
                    <div className="mt-1 text-base text-black">
                      Projection Type:{" "}
                      <span className="text-400 text-xs font-normal">
                        {projectionType}
                      </span>
                    </div>
                    <div className="mt-1 text-base text-black">
                      Sound Type:
                      <span className="text-400 text-xs font-normal">
                        {soundType}
                      </span>{" "}
                    </div>
                  </SheetDescription>
                </SheetHeader>
                <SheetFooter>
                  <Button onClick={handleCheckout} variant={"ghost"}>
                    Pay
                  </Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </>
      )}
    </div>
  );
};
