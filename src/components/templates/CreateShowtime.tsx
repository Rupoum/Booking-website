'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useToast } from '../molecules/Toaster/use-toast';
import { Button } from '../atoms/button';
import { Label } from '../atoms/label';
import { Input } from '../atoms/input';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const CreateShowtime = () => {
  const [form, setForm] = useState({
    showtimes: [{ time: '' }],
    screenId: '',
    movieId: ''
  });

  const [movies, setMovies] = useState([]);
  const [screens, setScreens] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/movie/movie');
        setMovies(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setError('Failed to fetch movies');
      }
    };

    const fetchScreens = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/cinema/cinema');
        setScreens(response.data);
      } catch (error) {
        console.error('Error fetching screens:', error);
        setError('Failed to fetch screens');
      }
    };

    fetchMovies();
    fetchScreens();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, index?: any) => {
    const { name, value } = e.target;
    if (index !== undefined) {
      const updatedShowtimes = [...form.showtimes];
      updatedShowtimes[index][name] = value;
      setForm({ ...form, showtimes: updatedShowtimes });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleAddShow = () => {
    setForm((prevForm) => ({
      ...prevForm,
      showtimes: [...prevForm.showtimes, { time: '' }]
    }));
  };

  const handleRemoveShow = (index: number) => {
    setForm((prevForm) => ({
      ...prevForm,
      showtimes: prevForm.showtimes.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError('');

    try {
      await axios.post('http://localhost:5000/api/screen/screen', {
        movieId: form.movieId,
        screenId: form.screenId,
        showtimes: form.showtimes.map((time) => ({ time: time.time }))
      },{
        headers: { Authorization: `Bearer ${localStorage.getItem("authtoken")}` },
      }
    );
      toast({ title: 'Showtimes created successfully.' });
      setForm({ showtimes: [{ time: '' }], screenId: '', movieId: '' });
      router.replace('/manager/cinemas');
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to create showtimes');
      toast({ title: error.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex justify-center  items-center mt-40'>
      <form onSubmit={handleSubmit}>
        <Label title="Movie">
          <select
            name="movieId"
            value={form.movieId}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded border-input"
          >
            <option value="">Select a movie...</option>
            {movies.map((movie: any) => (
              <option key={movie._id} value={movie._id} ref={movie}>
                {movie.title}
              </option>
            ))}
          </select>
        </Label>

        <Label title="Screen number">
        <select
          name="screenId"
          value={form.screenId}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded border-input"
        >
          <option value="">Select a screen...</option>
          {screens.map((cinema: any) =>
            cinema.screens.map((screen: any) => (
              <option key={cinema.screens.map((screen: { _id: any; }) => screen._id)} value={ cinema.screens.map((screen: { _id: any; }) => screen._id)} >
                {cinema.name} - Screen{screen.screenno}
              </option>
            ))
          )}
        </select>
      </Label>

        <Label title="Shows">
          <div className="grid grid-cols-3 gap-2">
            {form.showtimes.map((item, index) => (
              <div key={index}>
                <Input
                  type="datetime-local"
                  name="time"
                  value={item.time}
                  onChange={(e) => handleChange(e, index)}
                />
                <Button
                  className="mt-2 text-red-600"
                  type="button"
                  onClick={() => handleRemoveShow(index)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
          <Button
            className="flex items-center justify-center w-full py-2 mt-2 text-xs border border-dashed"
            size="sm"
            variant="link"
            type="button"
            onClick={handleAddShow}
          >
            <Plus className="w-4 h-4" /> Add show
          </Button>
        </Label>

        <Button loading={loading} type="submit">
          Submit
        </Button>
        {error && <p className="text-red-600">{error}</p>}
      </form>
    </div>
  );
};
