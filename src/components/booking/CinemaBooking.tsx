"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import SquareElem2 from "@/components/booking/SquareElem2";
import { Skeleton } from "@/components/ui/skeleton";
import { loadStripe } from "@stripe/stripe-js";
import { jwtDecode } from "jwt-decode";
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
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

interface Seat {
  row: number;
  column: number;
}

interface SeatGroup {
  seat: Seat[];
}

interface DecodedToken {
  id: string;
}

export const CinemaBooking = ({ screenId }: any) => {
  const [rows, setRows] = useState<number>(0);
  const [columns, setColumns] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [projectionType, setProjectionType] = useState<string>("");
  const [soundType, setSoundType] = useState<string>("");
  const [movie, setMovie] = useState<string>("");
  const [cinema, setCinema] = useState<string>("");
  const [screen, setScreen] = useState<string>("");
  const [bookedSeats, setBookedSeats] = useState<Seat[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [isTokenAvailable, setIsTokenAvailable] = useState<boolean>(true);
  const [booking, setBooking] = useState("");

  useEffect(() => {
    const fetchSeatDetails = async () => {
      try {
        const response = await axios.get(
          `https://bookmyshowfinal.onrender.com/api/screen/screen/cinema/${screenId}/seat`
        );
        const {
          rows,
          columns,
          price,
          projectionType,
          soundType,
          moviename,
          cinemaname,
          bookedSeats = [],
        } = response.data;
        console.log(bookedSeats);
        setScreen(screenId);
        setMovie(moviename);
        setCinema(cinemaname);
        setRows(rows);
        setColumns(columns);
        setPrice(price);

        setProjectionType(projectionType || "N/A");
        setSoundType(soundType || "N/A");

        const flattenedBookedSeats = bookedSeats.flatMap(
          (seatGroup: SeatGroup) => seatGroup.seat || []
        );

        const uniqueBookedSeats = Array.from(
          new Set(flattenedBookedSeats.map((seat: any) => JSON.stringify(seat)))
        ).map((seat: any) => JSON.parse(seat));

        setBookedSeats(uniqueBookedSeats);
        console.log("Unique booked seats:", uniqueBookedSeats);
      } catch (error) {
        console.error("Error fetching seat details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSeatDetails();
  }, [screenId]);

  useEffect(() => {
    const token = localStorage.getItem("authtoken");
    setIsTokenAvailable(!!token);
  }, []);

  const handleSelectSeat = (row: number, column: number) => {
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
        toast.error(
          <div className="text-black ">
            You are not Logged in !
            <Link
              href="/login"
              className="underline underline-offset-2 text-gray-500 cursor-pointer"
            >
              {" "}
              Login !
            </Link>
            .
          </div>
        );
        setIsTokenAvailable(false);
        return;
      }

      const decodedToken: any = jwtDecode(token);
      const userId = decodedToken.id;

      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
      );
      if (!stripe) {
        throw new Error("Stripe failed to initialize.");
      }
      const formattedSeats = selectedSeats.map((seat) => ({
        row: seat.row,
        column: seat.column,
      }));
      const response = await axios.post(
        "https://bookmyshowfinal.onrender.com/api/screen/payment",
        {
          userId: userId,
          cinemaName: cinema,
          movieName: movie,
          seats: formattedSeats,
          price: calculateTotalPrice(),
          screen_id: screenId,
        }
      );

      const { sessionId } = response.data;
      if (!sessionId) {
        throw new Error("Session ID not received from server.");
      }

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
    let currentColumns = columns;

    for (let i = 0; i < rows; i++) {
      const columnElements: JSX.Element[] = [];
      for (let j = 0; j < Math.max(currentColumns, 0); j++) {
        const isSelected = selectedSeats.some(
          (seat) => seat.row === i && seat.column === j
        );
        const isBooked = bookedSeats.some(
          (seat) => seat.row === i && seat.column === j
        );
        columnElements.push(
          <SquareElem2
            key={`${i}-${j}`}
            row={i}
            column={j}
            onSelect={!isBooked ? handleSelectSeat : () => {}}
            selected={isSelected}
            booked={isBooked}
          />
        );
      }
      rowElements.push(
        <div key={`row-${i}`} className="flex gap-4">
          {columnElements}
        </div>
      );
      currentColumns -= 5;
    }
    return (
      <div className="flex flex-col items-center gap-2 px-2 overflow-x-auto">
        {rowElements}
      </div>
    );
  };

  return (
    <div className="w-full">
      <ToastContainer />
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
                <Button
                  className="my-5 disabled:bg-gray-500 font-light"
                  disabled={selectedSeats.length === 0}
                >
                  {selectedSeats.length === 0
                    ? "Select at least one seat"
                    : "Checkout"}
                </Button>
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
                      Sound Type:{" "}
                      <span className="text-400 text-xs font-normal">
                        {soundType}
                      </span>
                    </div>
                  </SheetDescription>
                </SheetHeader>
                <div className=" flex justify-end mr-16">
                  <Button onClick={handleCheckout} variant="secondary">
                    Pay
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </>
      )}
    </div>
  );
};
