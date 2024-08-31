// 'use client'

// import { useGetCinema, useHandleSearch } from '@/components/utils/hooks'
// import { useEffect, useState } from 'react'
// // import { useMap } from 'react-map-gl'
// import { SimpleDialog } from './SimpleDialog'
// import { SelectMovie } from './SelectMovie'
// import { SelectShowtimes } from './SelectShows'
// import { SelectSeats } from './SelectSeats'
// interface cinema {
//   id: string;
//   name: string;
//   // Add other properties that the cinema object might have
// }

// export const MovieDialog = () => {
//   const { params, deleteAll } = useHandleSearch()

//   const cinemaId = params.get('cinemaId')
//   const movieId = params.get('movieId')
//   const screenId = params.get('screenId')
//   const showtimeId = params.get('showtimeId')

//   const [openDialog, setOpenDialog] = useState(Boolean(cinemaId))

//   const { cinema } = useGetCinema({ cinemaId })
//   // const { current: map } = useMap()

//   if (!cinema) {
//     return null
//   }

//   return (
//     <SimpleDialog
//       title={cinema.name}
//       open={openDialog}
//       setOpen={(state:any) => {
//         deleteAll()
//         console.log('Deleing..')
//         setOpenDialog(state)
//       }}
//     >
//       <div className="space-y-8">
//         <SelectMovie cinemaId={cinema.id} />

//         {movieId ? (
//           <SelectShowtimes
//             cinemaId={cinema.id}
//             movieId={movieId}
//             showtimeId={showtimeId ? showtimeId : null}
//           />
//         ) : null}

//         {screenId && showtimeId ? (
//           <SelectSeats showtimeId={+showtimeId} screenId={+screenId} />
//         ) : null}
//       </div>
//     </SimpleDialog>
//   )
// }
