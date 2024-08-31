// 'use client'
// import { useEffect, useState } from 'react'
// import Image from 'next/image'
// import axios from 'axios'

// import { format } from 'date-fns'

// import { Button } from '../atoms/button'
// import { Loading } from '../molecules/Loading'
// import { SimpleDialog } from '../organism/map/SimpleDialog'

// export interface ITicketsProps {}

// export const QRCode = ({ url }: { url: string }) => {
//   const [picUrl, setPicUrl] = useState<string | null>(null)
//   const [loading, setLoading] = useState(false)

//   useEffect(() => {
//     async function fetchImageUrl() {
//       setLoading(true)
//       try {
//         const response = await axios.get(`/api/getImageUrl`, {
//           params: { path: url },
//         })
//         setPicUrl(response.data.imageUrl)
//       } catch (error) {
//         console.error('Error fetching image URL:', error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchImageUrl()
//   }, [url])

//   if (loading) return <Loading />

//   return <Image width={200} height={200} src={picUrl || '/film.png'} alt="QR Code" />
// }

// export const TicketMovie = ({
//   ticket,
// }: {
//   ticket: any
// }) => {
//   const [open, setOpen] = useState(false)

//   return (
//     <div key={ticket.id}>
//       <SimpleDialog open={open} setOpen={setOpen} title="QR Code">
//         <QRCode url={ticket.qrCode || ''} />
//       </SimpleDialog>
//       <div className="flex gap-6">
//         <Image
//           width={200}
//           height={200}
//           className="rounded"
//           src={ticket.Bookings[0].Showtime.Movie.posterUrl || '/film.png'}
//           alt={ticket.Bookings[0].Showtime.Movie.title}
//         />
//         <div>
//           <div className="flex items-start justify-between gap-6">
//             <div>
//               <div className="text-lg font-semibold">
//                 {ticket.Bookings[0].Showtime.Movie.title}
//               </div>
//               <div>{ticket.Bookings[0].Showtime.Screen.Cinema.name}</div>
//             </div>
//             <div className="flex flex-col items-center p-1 border rounded">
//               <div className="text-xs">Screen</div>
//               <div className="text-xl font-bold">
//                 {ticket.Bookings[0].Showtime.Screen.number}
//               </div>
//             </div>
//           </div>
//           <div>
//             <div className="font-semibold">
//               {format(new Date(ticket.Bookings[0].Showtime.startTime), 'p')}
//             </div>
//             <div className="text-xs">
//               {format(new Date(ticket.Bookings[0].Showtime.startTime), 'PP')}
//             </div>
//           </div>
//           <div className="mt-4">
//             <div>Seats</div>
//             <div className="flex flex-wrap gap-2">
//               {ticket.Bookings.map((booking:any) => (
//                 <div
//                   key={booking.id}
//                   className="px-1 text-sm bg-white border rounded"
//                 >
//                   {booking.row}-{booking.column}
//                 </div>
//               ))}
//             </div>
//           </div>
//           <Button
//             variant="default"
//             className="mt-2"
//             size="sm"
//             onClick={() => setOpen(true)}
//           >
//             View QR code
//           </Button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export const Tickets = ({}: ITicketsProps) => {
//   const [tickets, setTickets] = useState<any[]>([]) // Replace 'any' with the correct type if available
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const fetchTickets = async () => {
//       try {
//         const response = await axios.get('/api/tickets')
//         setTickets(response.data)
//       } catch (error) {
//         console.error('Error fetching tickets:', error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchTickets()
//   }, [])

//   if (loading) {
//     return <Loading />
//   }

//   return (
//     <div className="flex flex-col gap-6">
//       {tickets.map((ticket) => (
//         <TicketMovie key={ticket.id} ticket={ticket} />
//       ))}
//     </div>
//   )
// }
