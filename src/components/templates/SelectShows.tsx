// import { useState, useEffect } from 'react'
// import axios from 'axios'
// import { Loading } from '@/components/molecules/Loading'
// import { formatDate, random } from '@/components/utils/functions'
// import { useHandleSearch } from '@/components/utils/hooks'
// import { noShowsMessages } from '@/components/utils/static'
// import { Box } from 'lucide-react'
// import { ShowtimeSelectCard } from './ShowtimeSelectCard'

// export const SelectShowtimes = ({
//   cinemaId,
//   movieId,
//   showtimeId,
// }: {
//   cinemaId:String
//   movieId: String
//   showtimeId?: String| null
// }) => {
//   const { addParam } = useHandleSearch()

//   // State for movies data, loading, and error
//   const [data, setData] = useState<any[]>([])
//   const [isLoading, setIsLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)

//   useEffect(() => {
//     const fetchShowtimes = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/screen/screen/${cinemaId}/${movieId}`)
//         setData(response.data)
//       } catch (err) {
//         console.error('Error fetching showtimes:', err)
//         setError('Failed to fetch showtimes. Please try again.')
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     fetchShowtimes()
//   }, [cinemaId, movieId])

//   return (
//     <div>
//       <div>Select showtime</div>

//       {isLoading && <Loading />}
//       {error && <div className="text-red-500">{error}</div>}

//       <div className="flex flex-col gap-4">
//         {data.length === 0 && !isLoading && !error && (
//           <div className="flex flex-col items-center justify-center w-full text-gray-800 rounded h-36 bg-gray-50">
//             <div className="flex items-center gap-1 text-lg font-semibold">
//               <Box />
//               <div>No shows.</div>
//             </div>
//             <div className="max-w-xs text-sm text-center">
//               {random(noShowsMessages)}
//             </div>
//           </div>
//         )}

//         {data.map((date) => (
//           <div key={date.date} className="w-full">
//             <div className="mb-2 text-lg font-semibold">
//               {formatDate(date.date)}
//             </div>
//             <div className="grid grid-cols-3 gap-2">
//               {[...date.showtimes]
//                 .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
//                 .map((showtime) => (
//                   <button
//                     key={showtime.id}
//                     onClick={() => {
//                       addParam('showtimeId', showtime.id)
//                       addParam('screenId', showtime.screenId)
//                     }}
//                   >
//                     <ShowtimeSelectCard
//                       selected={showtime.id === showtimeId}
//                       showtime={showtime}
//                     />
//                   </button>
//                 ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }
