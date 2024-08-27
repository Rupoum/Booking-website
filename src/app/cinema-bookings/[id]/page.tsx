import {CinemaBooking} from '@/components/booking/CinemaBooking'
import React from 'react'

const page = ({params}:any) => {
  // console.log(params.id)
  // console.log(params.id.rows);
  return (
    <div>
       <CinemaBooking screenId={params.id}/>
    </div>
  )
}

export default page