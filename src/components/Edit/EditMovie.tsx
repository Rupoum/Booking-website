"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export interface IEditMovieProps {
  movieId: string;
}

const EditMovie = ({ movieId }: IEditMovieProps) => {
  console.log("Editing movie with ID:", movieId);
  const [movie, setMovie] = useState<any>({
    title: "",
    genre: "",
    director: "",
    duration: "",
    releaseDate: "",
    posterUrl: "",
  });
  const router = useRouter();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(
          `https://bookmyshowfinal.onrender.com/api/movie/movie/${movieId}`
        );
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovie();
  }, [movieId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMovie({ ...movie, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      await axios.patch(
        `https://bookmyshowfinal.onrender.com/api/movie/movie/${movieId}`,
        movie,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
          },
        }
      );
      toast("Movie updated successfully");
      router.push("/admin/listmovie");
    } catch (error) {
      console.error("Error updating movie:", error);
      toast.error("Error updating movie");
    }
  };

  return (
    <div className="  w-80 flex justify-center items-center mt-20 mx-auto">
      <ToastContainer position="bottom-right" autoClose={5000} />
      {/* <h1 className="text-2xl font-medium mb-6">Edit Movie</h1> */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            title="text"
            type="text"
            name="title"
            value={movie.title}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Genre</label>
          <input
            title="text"
            type="text"
            name="genre"
            value={movie.genre}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Director</label>
          <input
            title="text"
            type="text"
            name="director"
            value={movie.director}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Duration</label>
          <input
            title="test"
            type="text"
            name="duration"
            value={movie.duration}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Release Date</label>
          <input
            title="date"
            typeof="date"
            type="date"
            name="releaseDate"
            value={movie.releaseDate}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>

        <Button onClick={handleSubmit} variant="outline">
          Update Movie
        </Button>
      </div>
    </div>
  );
};

export default EditMovie;
