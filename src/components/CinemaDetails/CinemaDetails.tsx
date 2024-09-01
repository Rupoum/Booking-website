"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { Datecard } from "../booking/Datecard";
import { Accessibility, Popcorn, ShieldAlert, Ticket } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Card, CardContent } from "../ui/card";

type Showtime = {
  time: string;
  _id: string;
};

type CinemaDetailsType = {
  name: string;
  address: string;
  moviename: string;
  time: Showtime[][];
  screenid: string;
  posterUrl: string;
};

const CinemaDetails = ({ movieId }: any) => {
  const [cinemaDetails, setCinemaDetails] = useState<CinemaDetailsType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [availableDates, setAvailableDates] = useState<Date[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!movieId) return;

    axios
      .get<CinemaDetailsType[]>(
        `https://bookmyshowfinal.onrender.com/api/movie/movie/cinema/${movieId}`
      )
      .then((response) => {
        const details = response.data;
        setCinemaDetails(details);
        const datesSet = new Set<string>();
        details.forEach((cinema) => {
          cinema.time.forEach((showtimeArray) => {
            showtimeArray.forEach((showtime) => {
              const date = new Date(showtime.time);
              const dateString = date.toISOString().split("T")[0];
              datesSet.add(dateString);
            });
          });
        });

        const datesArray = Array.from(datesSet).map(
          (dateString) => new Date(dateString)
        );
        setAvailableDates(datesArray);
      })
      .catch((error) => {
        console.error("Error fetching cinema details:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [movieId]);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    console.log("Selected date:", date);
  };

  const filteredShowtimes = (showtimeArray: Showtime[]) => {
    if (!selectedDate) return showtimeArray;
    return showtimeArray.filter((showtime) => {
      const showtimeDate = new Date(showtime.time);
      return (
        showtimeDate.getFullYear() === selectedDate.getFullYear() &&
        showtimeDate.getMonth() === selectedDate.getMonth() &&
        showtimeDate.getDate() === selectedDate.getDate()
      );
    });
  };

  const call = (screenId: string) => {
    const currentPath = window.location.pathname;

    const pathSegments = currentPath.split("/");

    const cinemaDetailsIndex = pathSegments.indexOf("cinema-details");

    if (cinemaDetailsIndex !== -1) {
      pathSegments.splice(cinemaDetailsIndex, 2);
    }

    pathSegments.push("cinema-bookings", screenId);

    const params = new URLSearchParams(window.location.search);

    const newUrl = `${pathSegments.join("/")}?${params.toString()}`;

    window.location.href = newUrl;
  };

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
    return (
      <div className="mt-20 text-center">
        Oops! No cinema details available.
      </div>
    );
  }

  return (
    <div className="mt-7 border-2 border-gray-300">
      <div className="w-full h-32 flex flex-col justify-center bg-gray-100">
        <div className="sm:mx-40 mx-4">
          <h1 className="font-sans text-4xl">{cinemaDetails[0].moviename}</h1>

          <div className="w-fit px-2 justify-center my-2 text-gray-500 py-2 flex items-center border-2 h-6 rounded-2xl border-gray-400 uppercase text-xs">
            comedy
          </div>
          <Datecard dates={availableDates} onSelectDate={handleDateSelect} />
        </div>
      </div>

      <div className="bg-gray-100 px-20 py-10 w-full h-auto">
        <div className="w-full bg-white py-10">
          {cinemaDetails.map((cinema, index) => {
            const showtimeArray = cinema.time.flatMap(filteredShowtimes);
            const hasShowtimes = showtimeArray.length > 0;

            return (
              <div
                key={index}
                className="w-full py-5 min-h-56 max-h-auto border-b-2"
              >
                <div className="flex justify-start h-auto">
                  <div className="flex items-start pl-12 pt-3 text-[0.9rem] flex-col font-semibold w-1/3">
                    <div className="flex ">
                      <div className="sm:w-40 w-20  flex justify-evenly">
                        <div>{cinema.name}</div>{" "}
                        <div className="sm:ml-44  text-gray-400  flex gap-1">
                          <AlertDialog>
                            <AlertDialogTrigger>
                              {" "}
                              <span>
                                <ShieldAlert />
                              </span>{" "}
                              Info
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  {cinema.name}
                                </AlertDialogTitle>
                              </AlertDialogHeader>
                              <div className="w-full h-60 bg-red-50">
                                {cinema.posterUrl ? (
                                  <Card
                                    className="relative w-full h-60 justify-between bg-cover bg-center"
                                    style={{
                                      backgroundImage: `url('${cinema.posterUrl}')`,
                                    }}
                                  />
                                ) : (
                                  <Card>
                                    <CardContent className="relative w-full flex justify-center items-center bg-gray-300 h-60 ">
                                      Cinema image not available
                                    </CardContent>
                                  </Card>
                                )}
                              </div>

                              <div className="w-full h-24 text-lg border-gray-200 border-y-2   ">
                                {cinema.address}
                              </div>
                              <div>
                                <div>Availiable facilities</div>
                                <div className="flex justify-between px-6 mt-5 text-xs">
                                  <div className="flex flex-col items-center">
                                    <div>
                                      <Ticket className="text-red-600" />
                                    </div>
                                    <div> Ticket Cancelation</div>
                                  </div>
                                  <div className="flex flex-col items-center">
                                    <div>
                                      <Popcorn className="text-yellow-500" />
                                    </div>
                                    <div> F&B</div>
                                  </div>
                                  <div className="flex flex-col items-center">
                                    <div>
                                      <Accessibility className="" />
                                    </div>
                                    <div>Wheel Chair Facility </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex justify-center w-full my-4">
                                <AlertDialogFooter>
                                  <AlertDialogCancel className="text-center">
                                    Continue Booking
                                  </AlertDialogCancel>
                                </AlertDialogFooter>
                              </div>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    </div>
                    <div className=" flex gap-10 mt-16">
                      <div className="flex text-sm gap-1 text-green-600 ">
                        {" "}
                        <span>
                          <Ticket />
                        </span>
                        M-tickets
                      </div>
                      <div className="flex text-sm items-center gap-1 text-yellow-600">
                        <span>
                          {" "}
                          <Popcorn />
                        </span>{" "}
                        Foods and Beverages
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap w-2/3 ml-16">
                    {hasShowtimes ? (
                      showtimeArray.map((showtime) => (
                        <div
                          key={showtime._id}
                          className="w-24 h-10 border-2 text-green-400 font-mono hover:bg-green-400 hover:text-white cursor-pointer px-1 bg-slate-50 flex gap-5 items-center justify-center rounded"
                          onClick={() => call(showtime._id)} // Pass screenId to the call function
                        >
                          {new Date(showtime.time).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      ))
                    ) : (
                      <div className="w-48 h-10 border-2 text-red-400 font-mono hover:bg-red-400 hover:text-white cursor-pointer px-1 bg-slate-50 flex gap-5 items-center justify-center rounded">
                        No show available
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CinemaDetails;
