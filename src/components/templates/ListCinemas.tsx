"use client";
import Image from "next/image";
import { Title2 } from "../atoms/typography";
import { format } from "date-fns";
import { AlertBox } from "../molecules/AlertBox";
import { formatDate } from "@/components/utils/functions";
import axios from "axios";
import { useEffect, useState } from "react";

export interface IListMoviesProps {
  cinemas: any[];
}

export const ListCinemas = () => {
  const [cinemas, setCinemas] = useState<IListMoviesProps["cinemas"]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCinemas = async () => {
      try {
        const response = await axios.get(
          "https://bookmyshowfinal.onrender.com/api/cinema/cinema"
        );
        setCinemas(response.data);
      } catch (error) {
        console.error("Error fetching cinemas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCinemas();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        {cinemas.length === 0 ? (
          <div>You have not created any cinemas yet.</div>
        ) : null}
      </div>

      <div className="flex flex-col gap-3">
        {cinemas.map((cinema) => (
          <CinemaInfo key={cinema.id} cinema={cinema} />
        ))}
      </div>
    </div>
  );
};

export const CinemaInfo = ({ cinema }: { cinema: any }) => {
  return (
    <div>
      <div className="text-2xl font-semibold">{cinema.name}</div>
      <div className="text-sm text-gray-600 mt-2">
        Screens: {cinema.Screens?.length || 0}
      </div>
      <div className="flex flex-col gap-4 mt-8">
        {cinema.Screens && cinema.Screens.length > 0 ? (
          cinema.Screens.map((screen: any) => (
            <div key={screen.id}>
              <div className="font-light text-xl ">
                Screen {cinema.screens.screenno}
              </div>

              {screen.Showtimes.length === 0 ? (
                <AlertBox>
                  <div>No shows found.</div>
                </AlertBox>
              ) : null}
              <ShowScreenShowtimes screenId={screen.id} />
            </div>
          ))
        ) : (
          <div>No screens available.</div>
        )}
      </div>
    </div>
  );
};

export const ShowScreenShowtimes = ({ screenId }: { screenId: number }) => {
  const [showtimes, setShowtimes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShowtimes = async () => {
      try {
        const response = await axios.get(
          `https://bookmyshowfinal.onrender.com/api/screen/screen/${screenId}`
        );
        setShowtimes(response.data);
      } catch (error) {
        console.error("Error fetching showtimes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShowtimes();
  }, [screenId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return showtimes.map((date) => (
    <div key={date.date}>
      <div className="my-8">
        <div className="mb-2 text-lg font-semibold">
          {formatDate(date.date)}
        </div>
        <div className="grid grid-cols-3 gap-2 ">
          {[...date.showtimes]
            .sort(
              (a, b) =>
                new Date(a.startTime).getTime() -
                new Date(b.startTime).getTime()
            )
            .map((showtime) => (
              <div className="p-3 border rounded" key={showtime.id}>
                <div className="font-semibold text-2xl">
                  {format(showtime.startTime.toString(), "p")}
                </div>
                <div className="text-gray-600 text-xs mb-2">
                  {format(showtime.startTime.toString(), "PP")}
                </div>
                <Image
                  src={showtime.Movie.posterUrl || "/film.png"}
                  alt=""
                  className="rounded-lg"
                  width={300}
                  height={300}
                />
                <Title2 className="mt-2">{showtime.Movie.title}</Title2>
              </div>
            ))}
        </div>
      </div>
    </div>
  ));
};
