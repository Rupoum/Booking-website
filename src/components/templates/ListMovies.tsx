import { Edit, EllipsisVertical, Trash } from "lucide-react";

import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"; // Import Shadcn Pagination components
import { Skeleton } from "@/components/ui/skeleton"; // Import Shadcn Skeleton component
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "../ui/button";
export interface IListMoviesProps {}

export const ListMovies = ({}: IListMoviesProps) => {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredMovie, setHoveredMovie] = useState<any | null>(null);
  const moviesPerPage = 5; // Number of movies to display per page
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          "https://bookmyshowfinal.onrender.com/api/movie/movie"
        );
        setMovies(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-wrap gap-5 mt-6">
        {Array.from({ length: moviesPerPage }).map((_, index) => (
          <div key={index}>
            <Skeleton className="w-56 h-72 rounded" />
            <Skeleton className="mt-2 h-6 w-3/4" />
          </div>
        ))}
      </div>
    );
  }

  // Calculate the current movies to display
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  // Calculate total pages
  const totalPages = Math.ceil(movies.length / moviesPerPage);

  return (
    <div className="px-10">
      <h1 className="flex justify-center py-10 font-medium text-2xl">
        All Movies
      </h1>
      <div className="flex flex-wrap gap-10 mt-6 justify-center">
        {currentMovies.map((movie) => (
          <div key={movie._id}>
            <Card
              className="relative w-56 h-72 flex flex-col justify-between bg-cover bg-center cursor-pointer"
              style={{ backgroundImage: `url('${movie.posterUrl}')` }}
              onMouseEnter={() => setHoveredMovie(movie)}
              onMouseLeave={() => setHoveredMovie(null)}
            >
              {" "}
              {hoveredMovie === movie && (
                <div
                  className="absolute inset-0 bg-black bg-opacity-50 transition duration-500 flex items-center justify-center"
                  // initial={{ opacity: 0, y: 20 }} // Start slightly below
                  // animate={{ opacity: 1, y: 0 }} // Slide up to original position
                  // exit={{ opacity: 0, y: 20 }} // Slide back down
                  // transition={{ duration: 0.3 }} // Animation duration
                >
                  <motion.div
                    className="text-center flex gap-3 text-white"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div>
                      <Drawer>
                        <DrawerTrigger>
                          <Edit className="w-8 h-8 hover:text-green-600" />
                        </DrawerTrigger>
                        <DrawerContent>
                          <DrawerHeader>
                            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                            <DrawerDescription>
                              This action cannot be undone.
                            </DrawerDescription>
                          </DrawerHeader>
                          <DrawerFooter>
                            <Button>Submit</Button>
                            <DrawerClose>
                              <Button variant="outline">Cancel</Button>
                            </DrawerClose>
                          </DrawerFooter>
                        </DrawerContent>
                      </Drawer>
                    </div>
                    <div>
                      <Trash className="w-8 h-8 hover:text-red-600" />
                    </div>
                  </motion.div>
                </div>
              )}
            </Card>
            <div className="flex items-center w-full gap-2 justify-between mt-5">
              <header className="text-xl w-2/3  truncate hover:text-clip ">
                {movie.title}
              </header>
              <div className=" w-1/3 flex justify-center items-center">
                <HoverCard>
                  <HoverCardTrigger className="flex  text-xs items-center ">
                    More details{" "}
                  </HoverCardTrigger>
                  <HoverCardContent className="text-lg  ">
                    <div>
                      <p className="">
                        Title:{" "}
                        <span className="text-gray-700">{movie.title}</span>{" "}
                      </p>
                    </div>

                    <div>
                      <p>
                        Genre:{" "}
                        <span className="text-gray-700">{movie.genre}</span>
                      </p>
                    </div>
                    <div>
                      <p>
                        Director:{" "}
                        <span className="text-gray-700">{movie.director}</span>
                      </p>
                    </div>
                    <div>
                      <p>
                        Duration:
                        <span className="text-gray-700">{movie.duration}</span>
                      </p>
                    </div>
                    <div>
                      <p>
                        Release:
                        <span className="text-gray-700">
                          {movie.releaseDate}
                        </span>
                      </p>
                    </div>
                    <div>
                      <p>
                        Created At:{" "}
                        <span className="text-gray-700">
                          {formatDate(movie.createdAt)}
                        </span>
                      </p>
                    </div>
                    <div>
                      <p>
                        Updated At:
                        <span className="text-gray-700">
                          {" "}
                          {formatDate(movie.updatedAt)}
                        </span>
                      </p>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Shadcn Pagination Controls */}
      <Pagination className="mt-20">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              // disabled={currentPage === 1}
            />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                href="#"
                onClick={() => setCurrentPage(index + 1)}
                className={currentPage === index + 1 ? "font-bold" : ""}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              // disabled={currentPage === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
