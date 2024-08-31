// pages/index.js

import TicketCard from "@/components/ticket/TicketCard";

export default function Home() {
  const ticketData = {
    image: "/path/to/image.jpg", // Use a real image path
    title: "Trailers Screening Show (U/A)",
    details: "Multi Language, 2D",
    dateTime: "Sat, 31 Aug | 10:30 AM",
    location: "INOX: BMC Bhawani Mall",
    tickets: 2,
    screen: "SCREEN 2",
    seats: "RY-B13,B14",
    bookingId: "T9ADJMV",
    cancellationPolicy: "cut-off time of 20 minutes before showtime",
    price: "120.00",
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <TicketCard ticket={ticketData} />
    </div>
  );
}
