import axios from 'axios'
import { useEffect, useState } from 'react'
import { Armchair } from 'lucide-react'

export const ShowRemainingSeats = ({ showtimeId }: { showtimeId: number }) => {
  const [totalSeats, setTotalSeats] = useState(0)
  const [bookedSeats, setBookedSeats] = useState(0)

  useEffect(() => {
    const fetchSeatsInfo = async () => {
      try {
        const response = await axios.get(`/api/showtimes/${showtimeId}/seatsInfo`)
        const data = response.data
        setTotalSeats(data.total || 0)
        setBookedSeats(data.booked || 0)
      } catch (error) {
        console.error('Failed to fetch seats information:', error)
      }
    }

    fetchSeatsInfo()
  }, [showtimeId])

  const remainingSeats = totalSeats - bookedSeats

  return (
    <div className="text-xs mt-2">
      {remainingSeats}/{totalSeats} <Armchair className="inline w-4 h-4" />
    </div>
  )
}
