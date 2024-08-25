import Image from 'next/image';
import axios from 'axios';
import { useEffect, useState } from 'react';

export interface IMovie {
  id: number;
  title: string;
  posterUrl: string;
}

export interface ICinemaSelectCardProps {
  movie: IMovie;
  selected?: boolean;
  cinemaId?: string; // Added this prop to pass the cinema ID
}

export const CinemaSelectCard = ({ movie, selected = false, cinemaId }: ICinemaSelectCardProps) => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get<IMovie[]>(`http://localhost:5000/api/screen/screen/cinema/${cinemaId}`);
        setMovies(response.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [cinemaId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-3 gap-3">
      {movies.map((movie) => (
        <div key={movie.id} className="flex flex-col items-start justify-start w-full gap-2">
          <Image
            width={200}
            height={300}
            alt={movie.title}
            src={movie.posterUrl?.startsWith('http') ? movie.posterUrl : '/film.png'}
            className={`object-cover w-full h-48 border-2 rounded ${
              selected ? 'shadow-xl border-primary' : 'shadow-sm border-white'
            }`}
          />
          <div className="text-sm text-left">{movie.title}</div>
        </div>
      ))}
    </div>
  );
};
