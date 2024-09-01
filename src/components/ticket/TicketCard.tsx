import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PhoneCall } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
interface TicketProps {
  ticket: {
    image: string;
    title: string;
    details: string;
    dateTime: string;
    location: string;
    tickets: number;
    screen: string;
    seats: string;
    bookingId: string;
    price: number;
  };
}

const TicketCard: React.FC<TicketProps> = ({ ticket }) => {
  // Parse the dateTime string into a Date object
  const date = new Date(ticket.dateTime);

  // Format the date and time using date-fns
  const formattedDate = format(date, "MMMM dd, yyyy");
  const formattedTime = format(date, "hh:mm a");

  return (
    <div className="w-full h-screen  flex justify-center items-center">
      <div className="w-[30rem] min-h-[40rem] bg-white px-7 py-10 rounded-xl">
        <div className="flex">
          <div>
            <Card
              className="relative w-32 shadow-xl shadow-slate-600 h-48 flex flex-col justify-between bg-cover bg-center cursor-pointer"
              style={{ backgroundImage: `url('${ticket.image}')` }}
            >
              {/* Optionally add content here if needed */}
            </Card>
          </div>

          <div className="px-7">
            <div className="font-bold text-xl">{ticket.title}</div>
            <div className="text-base text-gray-500">{ticket.details}</div>
            <div className="text-base text-gray-500">{formattedDate}</div>
            <div className="text-base text-gray-500">{formattedTime}</div>
            <div className="text-base text-gray-500">{ticket.location}</div>
          </div>
        </div>
        <div className="w-full h-[0.1rem] bg-gray-200 my-10"></div>
        <div className="bg-gray-100 rounded-xl flex items-center justify-center py-10 ">
          <div className="text-center flex flex-col gap-2">
            <div className="flex gap-2 items-center justify-center">
              <div className="text-base text-gray-500">
                {ticket.tickets} Ticket(s)
              </div>
              <div className="text-xl font-medium">{ticket.screen}</div>
            </div>
            <div>{ticket.seats}</div>
            <div className="font-semibold">BOOKING ID: {ticket.bookingId}</div>
          </div>
        </div>
        <div className="flex flex-col items-center my-10 justify-center  w-full rounded-xl py-7 bg-gray-100">
          <div>
            <Link href="https://wa.me/917456901002?text=Hello%20there!">
              <PhoneCall height={15} width={15} />
            </Link>
          </div>
          <div>Contact</div>
          <div>Support</div>
        </div>

        <div className="flex justify-between mt-10 px-16 ">
          <div>Total Amount</div>
          <div>Rs {ticket.price}</div>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
