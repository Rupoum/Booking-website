"use client";

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
import Image from 'next/image';

export interface IListMoviesProps {}

const CurrentlyPlaying = ({}: IListMoviesProps) => {
  const plugin = React.useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
  const [movies, setMovies] = React.useState<any[]>([]);
  const [selectedMovie, setSelectedMovie] = React.useState<any | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/movie/movie');
        setMovies(response.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="m-10">
      <div className="flex justify-between">
        <div>
          <h2>Currently Playing</h2>
        </div>
        <div>
          <Button variant="link" className="text-xs">
            See more{" "}
            <span className="ml-2">
              <MoveRight />
            </span>
          </Button>
        </div>
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
            {movies.map((movie, index) => (
              <CarouselItem
                key={index}
                className="mx-2 sm:basis-auto md:basis-auto lg:basis-auto"
              >
                <Card
                  className="w-56 h-64 flex flex-col justify-between bg-cover bg-center cursor-pointer"
                  onClick={() => openModal(movie)}
                >
                  <Image
                    src={movie.posterUrl?.startsWith('http') ? movie.posterUrl : '/film.png'}
                    alt={movie.title || 'Movie Poster'}
                    className="aspect-square object-cover rounded shadow-lg"
                    width={300}
                    height={300}
                  />
                  <div className="flex-grow"></div>
                  <div className="px-5">
                    <CardTitle className="text-white">{movie.title}</CardTitle>
                    <CardDescription className="text-white">
                      {movie.date} <br />
                      <span>{movie.rating}</span>
                    </CardDescription>
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      <Dialog open={!!selectedMovie} onOpenChange={closeModal}>
        <DialogContent>
          <DialogTitle>{selectedMovie?.title}</DialogTitle>
          <Image
            src={selectedMovie?.posterUrl?.startsWith('http') ? selectedMovie?.posterUrl : '/film.png'}
            alt={selectedMovie?.title}
            className="w-28 h-32 mb-4"
            width={112}
            height={128}
          />
          <DialogDescription>
            <p>Date: {selectedMovie?.date}</p>
            <p>Rating: {selectedMovie?.rating}</p>
          </DialogDescription>
          <Button onClick={closeModal} variant="destructive" className="mt-4">
            Book Tickets
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CurrentlyPlaying;
