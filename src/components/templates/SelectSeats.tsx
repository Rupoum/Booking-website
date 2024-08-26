'use client';
import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { generateSeatComment, groupSeatsByRow } from '@/components/utils/functions';
import { Button } from '../atoms/button';
import { Loading } from '../molecules/Loading';
import { useSeatSelection } from '@/components/utils/hooks';
import { Square, StaightMovieScreen } from './ScreenUtils';
import { SeatNumber } from './SeatNumber';
import jwt_decode from 'jwt-decode';

export interface ISelectSeatsProps {
  showtimeId: number;
  screenId: number;
}

export const SelectSeats = ({
  showtimeId,
  screenId,
}: ISelectSeatsProps) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('/api/auth/user');
        setUserId(response.data.userId);
      } catch (error) {
        console.error('Failed to fetch user:', error);
        setError('Failed to fetch user');
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/screen/screen/cinema/${showtimeId}/seats`);
        setData(response.data);
      } catch (error) {
        setError('Failed to fetch seats');
      } finally {
        setLoading(false);
      }
    };

    fetchSeats();
  }, [showtimeId]);

  const {
    state: { selectedSeats },
    toggleSeat,
    resetSeats,
  } = useSeatSelection();

  const handleCreateBooking = async () => {
    if (!userId) return;

    const seats = selectedSeats.map(({ column, row }) => ({
      row,
      column,
      price: data?.price || 0,
    }));

    try {
      const response = await axios.post('http://localhost:5000/api/screen/payment', {
        screenId,
        seats,
        showtimeId,
        price: data?.price || 0,
        userId,
      });

      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');
      const result = await stripe?.redirectToCheckout({
        sessionId: response.data.sessionId,
      });

      return result;
    } catch (error) {
      console.error('Failed to create Stripe session:', error);
    }

    resetSeats();
  };

  if (loading) return <Loading />;
  if (error) return <div>{error}</div>;

  const rows = groupSeatsByRow(data?.seats || []) || [];

  return (
    <div>
      <div>
        <StaightMovieScreen />
        <div className="flex justify-center overflow-x-auto py-2">
          <div>
            {Object.entries(rows).map(([rowNumber, seatsInRow]) => (
              <div key={rowNumber} className="flex gap-2 mt-1">
                {seatsInRow.map((seat) => (
                  <button
                    key={`${seat.row}-${seat.column}`}
                    disabled={Boolean(seat?.booked)}
                    onClick={() => toggleSeat(seat)}
                  >
                    <Square
                      booked={Boolean(seat?.booked)}
                      selected={Boolean(selectedSeats?.find(
                        (selectedSeat) =>
                          seat.column === selectedSeat.column &&
                          seat.row === selectedSeat.row,
                      ))}
                    />
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="py-4">
        <div className="text-lg font-light">
          {/* {generateSeatComment({ allSeats: rows, selectedSeats: })} */}
        </div>
        {selectedSeats.length ? (
          <div className="my-4">
            <div>Seats</div>
            <div className="flex flex-wrap gap-2">
              {selectedSeats.map(({ row, column }) => (
                <SeatNumber
                  key={`${row}-${column}`}
                  row={row}
                  column={column}
                />
              ))}
            </div>
          </div>
        ) : null}
      </div>
      <div className="flex justify-between mt-4">
        <Button onClick={() => resetSeats()} variant="destructive" size="sm">
          Reset
        </Button>
        {selectedSeats.length ? (
          <Button onClick={handleCreateBooking}>
            Create booking
          </Button>
        ) : null}
      </div>
    </div>
  );
};
