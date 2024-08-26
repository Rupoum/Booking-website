// "use client";
// import React, { useEffect, useState, useCallback } from "react";
// import axios from "axios";
// import SquareElem2 from "@/components/booking/SquareElem2";
// import { Skeleton } from "@/components/ui/skeleton";
// import { loadStripe } from "@stripe/stripe-js";
// import {jwtDecode} from "jwt-decode";

// export const CinemaBooking = () => {
//   const [rows, setRows] = useState<number>(0);
//   const [columns, setColumns] = useState<number>(0);
//   const [price, setPrice] = useState<number>(0);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [selectedSeats, setSelectedSeats] = useState<{ row: number; column: number }[]>([]);
//   const [hoverPrice, setHoverPrice] = useState<number>(0);

//   useEffect(() => {
//     const fetchSeatDetails = async () => {
//       try {
//         const response = await axios.get(
//           "https://bookmyshowfinal.onrender.com/api/screen/screen/cinema/66cb841556fe12d3cd890a9a/seat"
//         );
//         const { rows, columns, price } = response.data;
//         setRows(rows);
//         setColumns(columns);
//         setPrice(price);
//       } catch (error) {
//         console.error("Error fetching seat details:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSeatDetails();
//   }, []);

//   const handleSelectSeat = (row: number, column: number) => {
//     console.log(`Selected Seat - Row: ${row + 1}, Column: ${column + 1}`);
//     setSelectedSeats((prev) => {
//       const isSelected = prev.some(
//         (seat) => seat.row === row && seat.column === column
//       );
//       if (isSelected) {
//         return prev.filter(
//           (seat) => seat.row !== row || seat.column !== column
//         );
//       } else {
//         return [...prev, { row, column }];
//       }
//     });
//   };

//   const calculateTotalPrice = () => selectedSeats.length * price;

//   const handleMouseEnter = useCallback(() => {
//     setHoverPrice(calculateTotalPrice());
//   }, [selectedSeats, price]);

//   const handleMouseLeave = useCallback(() => {
//     setHoverPrice(0);
//   }, []);

//   const handleCheckout = async () => {
//     try {
//       // Retrieve the token from localStorage
//       const token = localStorage.getItem("authtoken");

//       if (!token) {
//         throw new Error("Token not found");
//       }

//       // Decode the JWT token to get the user ID
//       const decodedToken: any = jwtDecode(token);
//       const userId = decodedToken.id;

//       // Load Stripe
//       const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

//       // Make a POST request to your backend to create the Stripe session
//       const response = await axios.post("http://localhost:5000/api/screen/payment", {
//         userId: userId, // Use userId from decoded token
//         seats: selectedSeats, // Array of selected seats
//         price: calculateTotalPrice(), // Total price calculation function
//       });

//       // Extract sessionId from response
//       const { sessionId } = response.data;

//       // Redirect to Stripe's checkout page
//       const result = await stripe?.redirectToCheckout({ sessionId });
//       if (result?.error) {
//         console.error("Stripe Checkout error:", result.error.message);
//       }
//     } catch (error) {
//       console.error("Error during checkout:", error);
//     }
//   };

//   const renderRows = () => {
//     const rowElements: JSX.Element[] = [];
//     for (let i = 0; i < rows; i++) {
//       const columnElements: JSX.Element[] = [];
//       for (let j = 0; j < columns; j++) {
//         const isSelected = selectedSeats.some(
//           (seat) => seat.row === i && seat.column === j
//         );
//         columnElements.push(
//           <SquareElem2
//             key={`${i}-${j}`}
//             row={i}
//             column={j}
//             onSelect={handleSelectSeat}
//             selected={isSelected}
//           />
//         );
//       }
//       rowElements.push(
//         <div key={`row-${i}`} className="flex gap-4">
//           {columnElements}
//         </div>
//       );
//     }
//     return (
//       <div className="flex flex-col items-center gap-2 px-2 overflow-x-auto">
//         {rowElements}
//       </div>
//     );
//   };

//   return (
//     <div className="w-full">
//       {loading ? (
//         <div className="flex flex-col items-center gap-2">
//           {Array.from({ length: 10 }).map((_, rowIndex) => (
//             <div key={rowIndex} className="flex gap-4">
//               {Array.from({ length: 10 }).map((_, colIndex) => (
//                 <Skeleton
//                   key={`${rowIndex}-${colIndex}`}
//                   className="w-5 h-5 bg-gray-200"
//                 />
//               ))}
//             </div>
//           ))}
//         </div>
//       ) : (
//         <>
//           {renderRows()}
//           <div className="mt-4">
//             <div className="text-lg font-bold">
//               Total Price: ${calculateTotalPrice().toFixed(2)}
//             </div>
//           </div>
//           <div className="mt-4">
//             <button
//               className="p-2 bg-blue-500 text-white rounded"
//               onMouseEnter={handleMouseEnter}
//               onMouseLeave={handleMouseLeave}
//               onClick={handleCheckout}
//             >
//               Checkout
//             </button>
//             {hoverPrice > 0 && (
//               <div className="mt-2 text-lg font-bold">
//                 Hover Price: ${hoverPrice.toFixed(2)}
//               </div>
//             )}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };
