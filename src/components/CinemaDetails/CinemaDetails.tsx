"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";

type Showtime = {
  time: string;
  _id: string;
};

type CinemaDetailsType = {
  name: string;
  address: string;
  moviename: string;
  time: Showtime[][];
  screenid: string; // Add screenId to the type
};

const CinemaDetails = ({ movieId }: any) => {
  const [cinemaDetails, setCinemaDetails] = useState<CinemaDetailsType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!movieId) return;

    axios
      .get<CinemaDetailsType[]>(`http://localhost:5000/api/movie/movie/cinema/${movieId}`)
      .then((response) => {
        setCinemaDetails(response.data);
      })
      .catch((error) => {
        console.error("Error fetching cinema details:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [movieId]);

  const call = (screenId: string) => {
    const currentPath = window.location.pathname;

    // Split the path into segments
    const pathSegments = currentPath.split('/');

    // Find the index of 'cinema-details' in the path segments
    const cinemaDetailsIndex = pathSegments.indexOf('cinema-details');

    if (cinemaDetailsIndex !== -1) {
        // Remove 'cinema-details' and its associated ID
        pathSegments.splice(cinemaDetailsIndex, 2); // Remove 'cinema-details' and the ID following it
    }

    // Add 'cinema-booking' and the new screenId
    pathSegments.push('cinema-bookings', screenId);

    // Get the current query parameters
    const params = new URLSearchParams(window.location.search);

    // Construct the new URL
    const newUrl = `${pathSegments.join('/')}?${params.toString()}`;

    // Navigate to the new URL
    window.location.href = newUrl;
  }

  if (loading) {
    return (
      <div className="mt-20 border-2 border-gray-300">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-[40rem] w-full" />
      </div>
    );
  }

  if (cinemaDetails.length === 0) {
    return <div className="mt-20 text-center">No cinema details available.</div>;
  }

  return (
    <div className="mt-20 border-2 border-gray-300">
      <div className="w-full h-32 flex flex-col justify-center bg-gray-100">
        <div className="sm:mx-40 mx-4">
          <h1 className="font-sans text-4xl">{cinemaDetails[0].moviename}</h1>
          <div className="w-fit px-2 justify-center my-2 text-gray-500 py-2 flex items-center border-2 h-6 rounded-2xl border-gray-400 uppercase text-xs">
            comedy
          </div>
        </div>
      </div>

      <div className="bg-gray-100 px-20 py-10 w-full h-auto">
        <div className="w-full bg-white py-10">
          {cinemaDetails.map((cinema, index) => (
            <div key={index} className="w-full py-5 border-b-2">
              <div className="flex justify-start">
                <div className="flex items-start pl-12 pt-3 text-[0.9rem] font-semibold w-1/3">
                  {cinema.name}
                </div>
                <div className="flex flex-wrap gap-x-2 w-2/3">
                  {cinema.time.map((showtimeArray, showtimeIndex) => (
                    <div key={showtimeIndex} className="flex flex-col">
                      {showtimeArray.map((showtime) => (
                        <div
                          key={showtime._id}
                          className="w-24 h-10 border-2 text-green-400 font-mono hover:bg-green-400 hover:text-white cursor-pointer px-1 bg-slate-50 flex items-center justify-center rounded"
                          onClick={() => call(showtime._id)} // Pass screenId to the call function
                        >
                          {new Date(showtime.time).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CinemaDetails;
