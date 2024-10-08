"use client";
import { ChevronLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton"; // Adjust the import path as necessary

const MovieDetails = ({ screenId }: any) => {
  const [projectionType, setProjectionType] = useState<string | null>(null);
  const [soundType, setSoundType] = useState<string | null>(null);
  const [moviename, setMovieName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://bookmyshowfinal.onrender.com/api/screen/screen/cinema/${screenId}/seat`
        );

        const { projectionType, soundType, moviename } = response.data; // Destructure the needed fields
        setProjectionType(projectionType || "N/A"); // Use "N/A" if projectionType is not available
        setSoundType(soundType || "N/A"); // Use "N/A" if soundType is not available
        setMovieName(moviename);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchMovieDetails();
  }, [screenId]);

  return (
    <div className="w-full h-16 flex items-center gap-10 px-4">
      <div className="flex items-center">
        <Link href={"/"}>
          <ChevronLeft className="h-10 w-8 text-gray-800" />
        </Link>
      </div>
      <div className="flex flex-col items-center">
        <div className="text-lg font-semibold">{moviename}</div>
        {loading ? (
          <div>
            <Skeleton className="h-4 w-20 ml-5 bg-slate-200" />
            <div className="flex gap-2 text-xs items-center">
              Projection Type: <Skeleton className="h-4 w-10 bg-slate-200" />{" "}
              {/* Skeleton for projection type */}
              <span>||</span>
              Sound Type: <Skeleton className="h-4 w-10 bg-slate-200" />{" "}
              {/* Skeleton for sound type */}
            </div>
          </div>
        ) : (
          <div className="flex gap-2 text-xs items-center">
            <div className="text-xs font-semibold text-gray-600">
              Projection Type:{" "}
              <span className="text-400 text-xs font-normal">
                {projectionType}
              </span>
            </div>
            <span>||</span>
            <div className="text-xs text-gray-600 font-semibold">
              Sound Type:{" "}
              <span className="text-400 text-xs font-normal">{soundType}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
