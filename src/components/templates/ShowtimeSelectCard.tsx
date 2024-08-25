import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { ShowRemainingSeats } from './ShowRemainingSeats'
export interface IShowtime {
  id: number
  startTime: string
  Screen: {
    price: number
    projectionType: string
    soundSystemType: string
  }
}
export interface IShowtimeSelectCardProps {
  showtime: IShowtime
  selected?: boolean
}

export const ShowtimeSelectCard = ({
  showtime,
  selected = false,
}: IShowtimeSelectCardProps) => {
  console.log('Start time ', showtime.startTime)
  return (
    <div
      className={`flex border p-1 rounded flex-col items-start ${
        selected ? 'shadow-lg border-primary shadow-black/30' : ''
      }`}
    >
      <div className="text-sm font-bold">
        {format(new Date(showtime.startTime), 'p')}
      </div>
      <div className="text-sm">Rs.{showtime.Screen.price}</div>
      <div className="text-xs">{showtime.Screen.projectionType}</div>
      <div className="text-xs">{showtime.Screen.soundSystemType}</div>
      <ShowRemainingSeats showtimeId={showtime.id} />
    </div>
  )
}

// For fetching data related to showtimes (if needed elsewhere)
export const fetchShowtimes = async (cinemaId: number) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/screen/screen/cinema/${cinemaId}`)
    return response.data
  } catch (error) {
    console.error('Error fetching showtimes:', error)
    throw error
  }
}
