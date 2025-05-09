"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { MOVIES } from "@/lib/constants";
import { Seat, BookingState } from "@/lib/types";
import { Star, Clock } from "lucide-react";
import { motion } from "framer-motion";
import DateSelector from "@/components/DateSelector";
import TheaterSelector from "@/components/TheaterSelector";
import ShowtimeSelector from "@/components/ShowtimeSelector";
import SeatMap from "@/components/SeatMap";
import BookingSummary from "@/components/BookingSummary";

export default function MovieDetails({ initialMovie }) {
  const params = useParams();
  const router = useRouter();
  const [movie, setMovie] = useState(initialMovie);
  const [bookingState, setBookingState] = useState<BookingState>({
    movieId: initialMovie.id,
    theaterId: null,
    showtimeId: null,
    dateId: null,
    selectedSeats: [],
    totalPrice: 0,
  });

  const handleDateSelect = (dateId: number) => {
    setBookingState(prev => ({ ...prev, dateId }));
  };

  const handleTheaterSelect = (theaterId: number) => {
    setBookingState(prev => ({ ...prev, theaterId }));
  };

  const handleShowtimeSelect = (showtimeId: number) => {
    setBookingState(prev => ({ ...prev, showtimeId }));
  };

  const handleSeatSelectionChange = (seats: Seat[], totalPrice: number) => {
    setBookingState(prev => ({ 
      ...prev, 
      selectedSeats: seats,
      totalPrice
    }));
  };

  const handleBookNow = () => {
    alert(`
      Booking confirmed!
      
      Movie: ${movie?.title}
      Seats: ${bookingState.selectedSeats.map(s => s.id).join(", ")}
      Total Price: ₹${bookingState.totalPrice}
    `);
  };

  if (!movie) {
    return (
      <div className="container mx-auto px-4 py-12 min-h-screen flex items-center justify-center">
        <div className="clay-card bg-white dark:bg-gray-800 rounded-3xl p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Movie Banner */}
      <div className="relative h-[400px] w-full overflow-hidden">
        <Image
          src={movie.image}
          alt={movie.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
        
        <div className="container mx-auto px-4 relative h-full flex flex-col justify-end pb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-md text-xs font-bold flex items-center">
                <Star className="w-3 h-3 mr-1" />
                {movie.rating}/5
              </div>
              <div className="bg-gray-800 text-white px-2 py-1 rounded-md text-xs font-bold flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {movie.duration}
              </div>
            </div>
            
            <h1 className="text-4xl font-bold text-white mb-2">{movie.title}</h1>
            <p className="text-gray-300 max-w-xl">{movie.genre} • {movie.releaseDate}</p>
          </motion.div>
        </div>
      </div>
      
      {/* Booking Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="clay-card bg-white dark:bg-gray-800 rounded-3xl p-6">
              <h2 className="text-2xl font-bold mb-6">Select Date & Showtime</h2>
              
              <DateSelector onDateSelect={handleDateSelect} />
              <TheaterSelector onTheaterSelect={handleTheaterSelect} />
              <ShowtimeSelector onShowtimeSelect={handleShowtimeSelect} />
            </div>
            
            <div className="clay-card bg-white dark:bg-gray-800 rounded-3xl p-6">
              <h2 className="text-2xl font-bold mb-6">Select Seats</h2>
              <SeatMap onSelectionChange={handleSeatSelectionChange} />
            </div>
          </div>
          
          <div>
            <BookingSummary
              movieId={bookingState.movieId}
              theaterId={bookingState.theaterId}
              showtimeId={bookingState.showtimeId}
              dateId={bookingState.dateId}
              selectedSeats={bookingState.selectedSeats}
              totalPrice={bookingState.totalPrice}
              onBookNow={handleBookNow}
            />
          </div>
        </div>
      </div>
    </div>
  );
}