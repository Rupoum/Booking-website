import * as React from "react";
import { Button } from "../ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { MoveRight } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import axios from "axios";
import { motion } from "framer-motion"; // Import motion from framer-motion
import { Skeleton } from "@/components/ui/skeleton";

export interface IListMoviesProps {}

const CurrentlyPlaying = ({}: IListMoviesProps) => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );
  const [movies, setMovies] = React.useState<any[]>([]);
  const [selectedMovie, setSelectedMovie] = React.useState<any | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [hoveredMovie, setHoveredMovie] = React.useState<any | null>(null);

  React.useEffect(() => {
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

  const openModal = (movie: any) => {
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="m-10">
      <div className="flex justify-between">
        <h2>Currently Playing</h2>
        <Button variant="link" className="text-xs">
          See more{" "}
          <span className="ml-2">
            <MoveRight />
          </span>
        </Button>
      </div>
      <div className="mt-10 mx-14 flex flex-wrap justify-start">
        <Carousel
          className="w-full"
          plugins={[plugin.current]}
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselPrevious />
          <CarouselNext />
          <CarouselContent className="-ml-1">
            {loading
              ? // Show loading skeletons for each card while loading
                Array.from({ length: 5 }).map((_, index) => (
                  <CarouselItem
                    key={index}
                    className="mx-2 sm:basis-auto md:basis-auto lg:basis-auto"
                  >
                    <Skeleton className="h-64 w-56 rounded-xl" />
                  </CarouselItem>
                ))
              : movies.map((movie, index) => (
                  <CarouselItem
                    key={index}
                    className="mx-2 sm:basis-auto md:basis-auto lg:basis-auto"
                  >
                    <Card
                      className="relative w-56 h-64 flex flex-col justify-between bg-cover bg-center cursor-pointer"
                      style={{ backgroundImage: `url('${movie.posterUrl}')` }}
                      onClick={() => openModal(movie)}
                      onMouseEnter={() => setHoveredMovie(movie)}
                      onMouseLeave={() => setHoveredMovie(null)}
                    >
                      <div className="flex-grow"></div>

                      {hoveredMovie === movie && (
                        <motion.div
                          className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                          initial={{ opacity: 0, y: 20 }} // Start slightly below
                          animate={{ opacity: 1, y: 0 }} // Slide up to original position
                          exit={{ opacity: 0, y: 20 }} // Slide back down
                          transition={{ duration: 0.3 }} // Animation duration
                        >
                          <div className="text-center">
                            <CardTitle className="text-white">
                              {movie.title}
                            </CardTitle>
                            <CardDescription className="text-white">
                              {movie.genre} <br />
                              <span>{movie.releaseDate}</span>
                            </CardDescription>
                          </div>
                        </motion.div>
                      )}
                    </Card>
                    <div className="sm:hidden block mt-5">
                      <h2 className="text-xl">
                        {movie.title} <br />{" "}
                        <span className="text-gray-400 text-xs">
                          {movie.releaseDate}
                        </span>
                      </h2>
                    </div>
                  </CarouselItem>
                ))}
          </CarouselContent>
        </Carousel>
      </div>

      {/* Modal with animation */}
      <Dialog open={!!selectedMovie} onOpenChange={closeModal}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }} // Start small and transparent
          animate={{ opacity: 1, scale: 1 }} // Scale up and fade in
          exit={{ opacity: 0, scale: 0.8 }} // Scale down and fade out
          transition={{ duration: 0.1 }} // Animation duration
        >
          <DialogContent>
            <DialogTitle>{selectedMovie?.title}</DialogTitle>
            <div className="flex">
              <div>
                <Card
                  className="bg-cover bg-center w-30 h-36"
                  style={{
                    backgroundImage: `url('${selectedMovie?.posterUrl}')`,
                  }}
                />

                <DialogDescription>
                  <p>Date: {selectedMovie?.releaseDate}</p>
                  <p>Director: {selectedMovie?.director}</p>
                </DialogDescription>
              </div>
              <div className="ml-10">other things</div>
            </div>
            <Button
              onClick={closeModal}
              variant="destructive"
              className="mt-4 "
            >
              Book Tickets
            </Button>
          </DialogContent>
        </motion.div>
      </Dialog>
    </div>
  );
};

export default CurrentlyPlaying;
