// pages/index.js

import TicketCard from "@/components/ticket/TicketCard";

export default function Home() {
  const ticketData = {
    image:
      "https://firebasestorage.googleapis.com/v0/b/final-book-ae7ff.appspot.com/o/images%2FMV5BMTA1NmUxYzItZmVmNy00YmQxLTk4Y2UtZjVkMWUwMWQ5N2IxXkEyXkFqcGc%40._V1_QL75_UY281_CR18%2C0%2C190%2C281_.jpg?alt=media&token=4f7f0777-6364-44cd-a439-5b6bda9ea6c1",
    title: "Stree 2",
    details: "Horror, Directed by Diii",
    dateTime: "2024-08-27T15:47:00.000Z",
    location: "Cineopolis",
    tickets: 2,
    screen: "Screen 1",
    seats: "Row 6, Seats 8, 9",
    bookingId: "66d309b52f0359f55242299e",
    price: 500,
  };

  return (
    <div className="flex justify-center items-center min-h-screen  bg-gray-100">
      <div className="">
        <TicketCard ticket={ticketData} />
      </div>
    </div>
  );
}
