import { Plus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";

export interface IListMoviesProps {}

export const ListMovies = ({}: IListMoviesProps) => {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-end">
        <Link
          href={"/admin/movies/new"}
          className="flex items-center gap-2 my-2"
        >
          {/* <Plus /> Create movie */}
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {movies.map((movie) => (
          <MovieInfo key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};
export const MovieInfo = ({ movie }: { movie: any }) => {
  const imageUrl = movie.posterUrl?.startsWith("http")
    ? movie.posterUrl
    : "/film.png"; // Fallback to a default image if the URL is invalid

  return (
    <div>
      <Image
        src={imageUrl}
        alt={movie.title || "Movie Poster"}
        className="aspect-square object-cover rounded shadow-lg"
        width={300}
        height={300}
      />
      <div className="text-lg font-semibold">{movie.title}</div>
      <div>{movie.director}</div>
      <div className="text-xs text-gray-500 mt-2">{movie.genre}</div>
    </div>
  );
};
