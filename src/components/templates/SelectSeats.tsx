"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {jwtDecode} from "jwt-decode"; // Import jwt-decode to extract user ID from token

export const SeatBooking = () => {
  const [rows, setRows] = useState<number>(0);
  const [columns, setColumns] = useState<number>(0);
  const [selectedSeatId, setSelectedSeatId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Fetch and decode the JWT token from local storage to get the user ID
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken: any = jwtDecode(token);
      setUserId(decodedToken.userId); // Assuming the token contains a 'userId' field
    } else {
      console.error("User not authenticated");
      router.push("/login"); // Redirect to login if the token is not available
    }
  }, [router]);

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

  const handleSeatClick = (seatId: string) => {
    setSelectedSeatId(seatId);
  };

  const handleBooking = async () => {
    if (!selectedSeatId || !userId) return;

    try {
      const response = await axios.post("http://localhost:5000/api/booking", {
        seatId: selectedSeatId,
        userId, // Include user ID in the booking request
      });
      const bookingId = response.data.bookingId;
      alert(`Booking successful! Your booking ID is ${bookingId}`);
      router.push("/confirmation");
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };

  const renderRows = () => {
    const rowElements: JSX.Element[] = [];

    for (let i = 0; i < rows; i++) {
      const columnElements: JSX.Element[] = [];
      for (let j = 0; j < columns; j++) {
        const seatId = `${i}-${j}`; // Assuming seatId is generated like this
        columnElements.push(
          <button
            key={seatId}
            onClick={() => handleSeatClick(seatId)}
            className={`p-2 border ${
              selectedSeatId === seatId ? "bg-blue-500" : "bg-gray-200"
            }`}
          >
            {seatId}
          </button>
        );
      }
      rowElements.push(
        <div key={`row-${i}`} className="flex gap-2">
          {columnElements}
        </div>
      );
    }

    return rowElements;
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Select Your Seat</h1>
      <div className="flex flex-col gap-2">{renderRows()}</div>
      <button
        onClick={handleBooking}
        className="mt-4 p-2 bg-green-500 text-white"
        disabled={!selectedSeatId}
      >
        Book Selected Seat
      </button>
    </div>
  );
};

export default SeatBooking;
