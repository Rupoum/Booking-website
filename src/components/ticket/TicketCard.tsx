// components/TicketCard.js

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
const TicketCard = ({ ticket }: any) => {
  return (
    // <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
    //   <div className="md:flex">
    //     <div className="md:flex-shrink-0">
    //       <img
    //         className="h-48 w-full object-cover md:w-48"
    //         src={ticket.image}
    //         alt="Movie poster"
    //       />
    //     </div>
    //     <div className="p-8">
    //       <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
    //         {ticket.title}
    //       </div>
    //       <p className="mt-2 text-gray-500">{ticket.details}</p>
    //       <p className="mt-2 text-gray-500">{ticket.dateTime}</p>
    //       <p className="mt-2 text-gray-500">{ticket.location}</p>
    //       <div className="mt-4 border-t border-gray-200 pt-4">
    //         <div className="flex justify-between text-gray-700">
    //           <span>{ticket.tickets} Ticket(s)</span>
    //           <span className="font-bold">{ticket.screen}</span>
    //         </div>
    //         <p className="text-gray-500">{ticket.seats}</p>
    //         <p className="text-gray-500 font-bold">
    //           BOOKING ID: {ticket.bookingId}
    //         </p>
    //       </div>
    //       <p className="mt-4 text-sm text-gray-500">
    //         Cancellation available: {ticket.cancellationPolicy}
    //       </p>
    //       <div className="flex justify-around mt-4 text-indigo-600">
    //         <button className="flex items-center space-x-1">
    //           <span>Cancel booking</span>
    //         </button>
    //         <button className="flex items-center space-x-1">
    //           <span>Contact support</span>
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="w-full h-screen bg-gray-200 flex justify-center items-center">
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
            <div className="text-base text-gray-500"> {ticket.dateTime}</div>
            <div className="text-base text-gray-500">{ticket.location}</div>
          </div>
        </div>
        <div className="w-full h-[0.1rem] bg-gray-200 my-10"></div>
        <div className="bg-gray-100 rounded-xl flex items-center justify-center py-10 ">
          <div className="text-center flex flex-col gap-2">
            <div className="flex gap-2 items-center">
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
