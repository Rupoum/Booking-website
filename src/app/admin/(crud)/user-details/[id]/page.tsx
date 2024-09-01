"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect, useState } from "react";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";

const Page = ({ params }: any) => {
  const [bookingData, setBookingData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const response = await axios.get(
          `https://bookmyshowfinal.onrender.com/api/customer/booking/${params.id}`
        );
        const data = await response.data;
        setBookingData(data.booking || []); // Ensure bookingData is always an array
      } catch (error) {
        console.error("Error fetching booking data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookingData();
  }, [params.id]);

  if (loading) {
    return (
      <div className="px-24 mt-10">
        <Skeleton className="h-8 w-1/2 mb-4" /> {/* Skeleton for User ID */}
        <Skeleton className="h-8 w-full mb-4" /> {/* Skeleton for Movie ID */}
        <Skeleton className="h-40 w-full" />{" "}
        {/* Skeleton for Booking Details Table */}
      </div>
    );
  }

  return (
    <div className="px-24 mt-10">
      <Table>
        <TableCaption>User and Invoice Details</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID-Name</TableHead>
            <TableHead>Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">User ID</TableCell>
            <TableCell>{params.id}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="font-medium">Movie ID</TableCell>
            <TableCell>
              {Array.isArray(bookingData) && bookingData.length === 0 ? (
                <div>No bookings available</div>
              ) : (
                bookingData.map((booking) => (
                  <Accordion type="single" collapsible key={booking._id}>
                    <AccordionItem value={booking._id}>
                      <AccordionTrigger>
                        <div>
                          <strong>Cinema:</strong> {booking.cinema},{" "}
                          <strong>Movie:</strong> {booking.movie_id}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <Table>
                          <TableCaption>Booking Details</TableCaption>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Detail</TableHead>
                              <TableHead>Value</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell className="font-medium">
                                User ID
                              </TableCell>
                              <TableCell>{booking.user_id}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">
                                Movie Name
                              </TableCell>
                              <TableCell>{booking.movie_id}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">
                                Status
                              </TableCell>
                              <TableCell>{booking.status}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">
                                Screen ID
                              </TableCell>
                              <TableCell>{booking.screen_id}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">
                                Seats
                              </TableCell>
                              <TableCell>
                                {booking.seat_id
                                  .map(
                                    (seat: any) =>
                                      `Row ${seat.row + 1}, Column ${
                                        seat.column + 1
                                      }`
                                  )
                                  .join(", ")}
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">
                                Cinema
                              </TableCell>
                              <TableCell>{booking.cinema}</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ))
              )}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default Page;
