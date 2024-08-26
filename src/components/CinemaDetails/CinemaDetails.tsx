"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Datecard } from "@/components/booking/Datecard";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams } from "react-router-dom"; // Import useParams from react-router-dom

type Showtime = {
  time: string;
  _id: string;
};

type CinemaDetailsType = {
  name: string;
  Address: string;
  moviename: string;
  time: Showtime[];
};

const CinemaDetails = ({movieId}:any) => {
  const [cinemaDetails, setCinemaDetails] = useState<CinemaDetailsType | null>(null);
  const [times, setTimes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

//   const { movieId } = useParams<{ movieId: string }>(); // Retrieve movieId from URL parameters
  useEffect(() => {
    if (!movieId) return;

    axios
      .get<CinemaDetailsType>(`https://bookmyshowfinal.onrender.com/api/movie/movie/cinema/${movieId}`)
      .then((response) => {
        const data = response.data;
        setCinemaDetails(data);
        setTimes(
          data.time.map((t) =>
            new Date(t.time).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          )
        );
      })
      .catch((error) => {
        console.error("Error fetching cinema details:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [movieId]);

  if (loading) {
    return (
      <div className="mt-20 border-2 border-gray-300">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-[40rem] w-full" />
      </div>
    );
  }

  if (!cinemaDetails) {
    return <div className="mt-20 text-center">No cinema details available.</div>;
  }

  return (
    <div className="mt-20 border-2 border-gray-300">
      <div className="w-full h-32 flex flex-col justify-center bg-gray-100">
        <div className="sm:mx-40 mx-4">
            {/* <h1>{movieId}</h1> */}
          <h1 className="font-sans text-4xl">{cinemaDetails.moviename}</h1>
          <div className="w-fit px-2 justify-center my-2 text-gray-500 py-2 flex items-center border-2 h-6 rounded-2xl border-gray-400 uppercase text-xs">
            comedy
          </div>
        </div>
      </div>

      <div className="w-full h-20 border-2">
        <div className="sm:ml-20 ml-14 flex items-center py-3">
          <Datecard />
        </div>
      </div>

      <div className="bg-gray-100 px-20 py-10 w-full h-[40rem]">
        <div className="w-full h-[32rem] bg-white py-10">
          <div className="w-full min-h-48 max-h-fit py-5 border-y-2">
            <div className="flex">
              <div className="flex items-start pl-12 pt-3 text-[0.9rem] font-semibold justify-start h-48 w-1/3">
                {cinemaDetails.name}
              </div>
              <div className="flex gap-x-1 flex-wrap w-2/3">
                {times.map((time, index) => (
                  <div
                    key={index}
                    className="w-24 h-10 border-2 text-green-400 font-mono hover:bg-green-400 hover:text-white cursor-pointer px-1 bg-slate-50 flex items-center justify-center rounded"
                  >
                    {time}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CinemaDetails;
