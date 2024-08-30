// components/TicketCard.js

import React from "react";

const TicketCard = ({ ticket }: any) => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img
            className="h-48 w-full object-cover md:w-48"
            src={ticket.image}
            alt="Movie poster"
          />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            {ticket.title}
          </div>
          <p className="mt-2 text-gray-500">{ticket.details}</p>
          <p className="mt-2 text-gray-500">{ticket.dateTime}</p>
          <p className="mt-2 text-gray-500">{ticket.location}</p>
          <div className="mt-4 border-t border-gray-200 pt-4">
            <div className="flex justify-between text-gray-700">
              <span>{ticket.tickets} Ticket(s)</span>
              <span className="font-bold">{ticket.screen}</span>
            </div>
            <p className="text-gray-500">{ticket.seats}</p>
            <p className="text-gray-500 font-bold">
              BOOKING ID: {ticket.bookingId}
            </p>
          </div>
          <p className="mt-4 text-sm text-gray-500">
            Cancellation available: {ticket.cancellationPolicy}
          </p>
          <div className="flex justify-around mt-4 text-indigo-600">
            <button className="flex items-center space-x-1">
              <span>Cancel booking</span>
            </button>
            <button className="flex items-center space-x-1">
              <span>Contact support</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
