"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Seat } from "@/lib/types";
import { MOVIES, THEATERS, SHOWTIMES, DATES } from "@/lib/constants";
import { Ticket, Calendar, Clock, MapPin } from "lucide-react";

interface BookingSummaryProps {
  movieId: number | null;
  theaterId: number | null;
  showtimeId: number | null;
  dateId: number | null;
  selectedSeats: Seat[];
  totalPrice: number;
  onBookNow: () => void;
}

export default function BookingSummary({
  movieId,
  theaterId,
  showtimeId,
  dateId,
  selectedSeats,
  totalPrice,
  onBookNow,
}: BookingSummaryProps) {
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setIsComplete(
      movieId !== null &&
      theaterId !== null &&
      showtimeId !== null &&
      dateId !== null &&
      selectedSeats.length > 0
    );
  }, [movieId, theaterId, showtimeId, dateId, selectedSeats]);

  const selectedMovie = movieId ? MOVIES.find(m => m.id === movieId) : null;
  const selectedTheater = theaterId ? THEATERS.find(t => t.id === theaterId) : null;
  const selectedShowtime = showtimeId ? SHOWTIMES.find(s => s.id === showtimeId) : null;
  const selectedDate = dateId ? DATES.find(d => d.id === dateId) : null;

  return (
    <div className="clay-card bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-6 sticky top-4">
      <h2 className="text-xl font-bold mb-4">Booking Summary</h2>
      
      <div className="space-y-4 mb-6">
        {selectedMovie && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-3"
          >
            <Ticket className="w-5 h-5 text-indigo-500 mt-0.5" />
            <div>
              <p className="text-sm text-gray-500">Movie</p>
              <p className="font-medium">{selectedMovie.title}</p>
            </div>
          </motion.div>
        )}
        
        {selectedTheater && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-3"
          >
            <MapPin className="w-5 h-5 text-indigo-500 mt-0.5" />
            <div>
              <p className="text-sm text-gray-500">Theater</p>
              <p className="font-medium">{selectedTheater.name}</p>
              <p className="text-sm text-gray-500">{selectedTheater.location}</p>
            </div>
          </motion.div>
        )}
        
        {selectedDate && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-3"
          >
            <Calendar className="w-5 h-5 text-indigo-500 mt-0.5" />
            <div>
              <p className="text-sm text-gray-500">Date</p>
              <p className="font-medium">{selectedDate.day}, {selectedDate.date} {selectedDate.month}</p>
            </div>
          </motion.div>
        )}
        
        {selectedShowtime && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-3"
          >
            <Clock className="w-5 h-5 text-indigo-500 mt-0.5" />
            <div>
              <p className="text-sm text-gray-500">Showtime</p>
              <p className="font-medium">{selectedShowtime.time}</p>
            </div>
          </motion.div>
        )}
      </div>
      
      <AnimatePresence>
        {selectedSeats.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6"
          >
            <h3 className="font-medium mb-2">Selected Seats ({selectedSeats.length})</h3>
            <div className="flex flex-wrap gap-2">
              {selectedSeats.map((seat) => (
                <motion.div
                  key={seat.id}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className={`px-2 py-1 rounded-lg text-xs font-medium 
                    ${seat.type === "GOLD" 
                      ? "bg-amber-100 text-amber-800" 
                      : "bg-gray-100 text-gray-800"
                    }`}
                >
                  {seat.row}{seat.number}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="flex justify-between items-center mb-6 font-bold text-lg">
        <span>Total:</span>
        <AnimatePresence mode="wait">
          <motion.span
            key={totalPrice}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="text-indigo-600"
          >
            ₹{totalPrice}
          </motion.span>
        </AnimatePresence>
      </div>
      
      <motion.button
        onClick={onBookNow}
        disabled={!isComplete}
        className={`clay-button w-full py-3 px-4 rounded-xl text-white font-bold 
          ${isComplete 
            ? "bg-gradient-to-r from-indigo-600 to-purple-600" 
            : "bg-gray-400 cursor-not-allowed"
          }`}
        whileHover={isComplete ? { y: -3 } : {}}
        whileTap={isComplete ? { y: 0 } : {}}
      >
        Book Now
      </motion.button>
    </div>
  );
}