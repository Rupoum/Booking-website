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
// Define the Movie interface
interface Movie {
  name: string;
  date: string;
  rating: string;
  imageUrl: string;
}
const CurrentlyPlaying = () => {
  // Sample movie data with image URLs
  const movies = [
    {
      name: "Movie 1",
      date: "20 April",
      rating: "18+",
      imageUrl:
        "https://images-cdn.ubuy.co.in/634d0a48023cd2292277f3df-avengers-endgame-marvel-studios-framed.jpg",
    },
    {
      name: "Movie 1",
      date: "20 April",
      rating: "18+",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/final-book-ae7ff.appspot.com/o/images%2FScreenshot%202023-03-13%20221302.png?alt=media&token=10681902-39a5-4526-bf3f-43b9e2e87eff",
    },
    {
      name: "Movie 2",
      date: "21 April",
      rating: "PG-13",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-dtyrpDq8x5vqSSobaxz0-Ak3mhk7wp0wkQ&s",
    },
    {
      name: "Movie 3",
      date: "22 April",
      rating: "R",
      imageUrl:
        "https://m.media-amazon.com/images/I/91zTlD7AY1L._AC_UF1000,1000_QL80_.jpg",
    },
    {
      name: "Movie 4",
      date: "23 April",
      rating: "PG",
      imageUrl:
        "https://artofthemovies.co.uk/cdn/shop/files/IMG_4154_1-780453_de0cc110-550d-4448-a7ec-d3ff945c0739.jpg?v=1696169470",
    },
    {
      name: "Movie 5",
      date: "24 April",
      rating: "G",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFXFBVUSIv-30rx7iCyfdi1ChHI-NTpZZzzQ&s",
    },
    {
      name: "Movie 6",
      date: "25 April",
      rating: "18+",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-jy4JvfKZu5ljE3DlkQ3MkaqkYV19iROVNA&s",
    },
    {
      name: "Movie 7",
      date: "26 April",
      rating: "PG-13",
      imageUrl:
        "https://imgc.allpostersimages.com/img/posters/trends-international-marvel-cinematic-universe-black-panther-group-one-sheet_u-L-Q1RG4B20.jpg",
    },
    {
      name: "Movie 8",
      date: "27 April",
      rating: "R",
      imageUrl:
        "https://media.designrush.com/tinymce_images/205891/conversions/6.-Ava-content.jpg",
    },

    {
      name: "Movie 9",
      date: "20 April",
      rating: "18+",
      imageUrl:
        "https://images-cdn.ubuy.co.in/634d0a48023cd2292277f3df-avengers-endgame-marvel-studios-framed.jpg",
    },
    {
      name: "Movie 10",
      date: "21 April",
      rating: "PG-13",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-dtyrpDq8x5vqSSobaxz0-Ak3mhk7wp0wkQ&s",
    },
    {
      name: "Movie 11",
      date: "22 April",
      rating: "R",
      imageUrl:
        "https://m.media-amazon.com/images/I/91zTlD7AY1L._AC_UF1000,1000_QL80_.jpg",
    },
    {
      name: "Movie 12",
      date: "23 April",
      rating: "PG",
      imageUrl:
        "https://artofthemovies.co.uk/cdn/shop/files/IMG_4154_1-780453_de0cc110-550d-4448-a7ec-d3ff945c0739.jpg?v=1696169470",
    },
    {
      name: "Movie 13",
      date: "24 April",
      rating: "G",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFXFBVUSIv-30rx7iCyfdi1ChHI-NTpZZzzQ&s",
    },
    {
      name: "Movie 14",
      date: "25 April",
      rating: "18+",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-jy4JvfKZu5ljE3DlkQ3MkaqkYV19iROVNA&s",
    },
    {
      name: "Movie 15",
      date: "26 April",
      rating: "PG-13",
      imageUrl:
        "https://imgc.allpostersimages.com/img/posters/trends-international-marvel-cinematic-universe-black-panther-group-one-sheet_u-L-Q1RG4B20.jpg",
    },
    {
      name: "Movie 16",
      date: "27 April",
      rating: "R",
      imageUrl:
        "https://media.designrush.com/tinymce_images/205891/conversions/6.-Ava-content.jpg",
    },
  ];
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  // State for modal
  const [selectedMovie, setSelectedMovie] = React.useState<Movie | null>(null);

  // Function to open modal
  const openModal = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  // Function to close modal
  const closeModal = () => {
    setSelectedMovie(null);
  };
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
                  style={{ backgroundImage: `url('${movie.imageUrl}')` }} // Use the image URL from movie data
                  onClick={() => openModal(movie)}
                >
                  <div className="flex-grow"></div>
                  <div className="px-5">
                    <CardTitle className="text-white">{movie.name}</CardTitle>
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
      {/* Modal for displaying movie details */}
      <Dialog open={!!selectedMovie} onOpenChange={closeModal}>
        <DialogContent>
          <DialogTitle>{selectedMovie?.name}</DialogTitle>
          <img
            src={selectedMovie?.imageUrl}
            alt={selectedMovie?.name}
            className="w-28 h-32 mb-4"
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
