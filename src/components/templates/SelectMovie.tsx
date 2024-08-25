'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'

import { Loading } from '@/components/molecules/Loading'
import { useHandleSearch } from '@/components/utils/hooks'
import { CinemaSelectCard } from './CinemaSelectCard'
import { resolveSoa } from 'dns'

export const SelectMovie = ({ cinemaId }: { cinemaId: String }) => {
  const [movies, setMovies] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { params, addParam, deleteParam } = useHandleSearch()

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/screen/screen/cinema/${cinemaId}`)
        setMovies(response.data)
         console.log(response.data);
            } catch (error) {
        console.error('Error fetching movies:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchMovies()
  }, [cinemaId])

  if (isLoading) {
    return <Loading />
  }

  if (movies.length === 0) {
    return <div>Currently no shows are running in this cinema.</div>
  }

  return (
    <div>
      <div>Select movie</div>
      <div className="grid grid-cols-3 gap-2">
        {movies.map((movie) => (
          <button
            key={movie.Id}
            onClick={() => {
              deleteParam('showtimeId')
              deleteParam('screenId')
              addParam('movieId', movie.id)
            }}
          >
     <CinemaSelectCard
  movie={movie}
  selected={params.get('movieId') && movie.id ? params.get('movieId') === movie.id.toString() : false}
/>


          </button>
        ))}
      </div>
    </div>
  )
}
