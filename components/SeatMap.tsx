"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Seat } from "@/lib/types";
import { generateSeats, SEAT_TYPES } from "@/lib/constants";
import { toggleSeatSelection, calculateTotalPrice } from "@/lib/utils/booking";

interface SeatMapProps {
  onSelectionChange: (seats: Seat[], totalPrice: number) => void;
}

export default function SeatMap({ onSelectionChange }: SeatMapProps) {
  const [seats, setSeats] = useState<Seat[][]>([]);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);

  useEffect(() => {
    setSeats(generateSeats());
  }, []);

  useEffect(() => {
    const totalPrice = calculateTotalPrice(selectedSeats);
    onSelectionChange(selectedSeats, totalPrice);
  }, [selectedSeats, onSelectionChange]);

  const handleSeatClick = (seat: Seat) => {
    const { updatedSeats, updatedSelectedSeats } = toggleSeatSelection(
      seat,
      seats,
      selectedSeats
    );
    setSeats(updatedSeats);
    setSelectedSeats(updatedSelectedSeats);
  };

  const getSeatTypeColor = (type: string, isSelected: boolean, isBooked: boolean) => {
    if (isBooked) return "bg-gray-700";
    if (isSelected) return "bg-blue-500";
    return type === "GOLD" 
      ? "bg-amber-300 hover:bg-amber-400" 
      : "bg-gray-300 hover:bg-gray-400";
  };

  return (
    <div className="mb-8">
      <div className="mb-10 relative w-full overflow-hidden">
        <div className="clay-card bg-gradient-to-r from-purple-500/10 to-indigo-500/10 p-8 rounded-3xl mx-auto max-w-4xl">
          {/* Screen */}
          <div className="relative mb-12">
            <div className="h-8 bg-white/10 rounded-t-full mx-auto w-4/5 backdrop-blur-sm"></div>
            <div className="text-center text-sm font-medium text-white/70 mt-2">SCREEN</div>
            
            {/* Curved lines to represent screen distance */}
            <div className="absolute -bottom-8 left-0 right-0 flex justify-center">
              {[1, 2, 3].map((i) => (
                <div 
                  key={i} 
                  className="h-[1px] bg-white/10 w-[80%] absolute"
                  style={{
                    bottom: i * 3,
                    opacity: 0.2 / i,
                    width: `${80 - (i * 5)}%`,
                  }}
                ></div>
              ))}
            </div>
          </div>

          {/* Seat Map */}
          <div className="flex flex-col items-center space-y-2">
            {seats.map((row, rowIndex) => (
              <div key={rowIndex} className="flex justify-center space-x-2">
                <div className="w-6 h-8 flex items-center justify-center text-white/70 text-sm">
                  {row[0]?.row}
                </div>
                {row.map((seat) => (
                  <motion.button
                    key={seat.id}
                    disabled={seat.isBooked}
                    onClick={() => handleSeatClick(seat)}
                    className={`w-8 h-8 rounded-t-lg ${getSeatTypeColor(seat.type, seat.isSelected, seat.isBooked)} 
                      transition-all duration-200 relative clay-seat`}
                    whileHover={!seat.isBooked ? { y: -2 } : {}}
                    whileTap={!seat.isBooked ? { y: 0 } : {}}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.3, 
                      delay: rowIndex * 0.04 + (seat.number * 0.02) 
                    }}
                  >
                    {seat.isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <span className="text-white text-xs font-bold">{seat.number}</span>
                      </motion.div>
                    )}
                  </motion.button>
                ))}
                <div className="w-6 h-8 flex items-center justify-center text-white/70 text-sm">
                  {row[0]?.row}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Seat Legend */}
      <div className="flex justify-center gap-8 mt-4 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-amber-300 rounded-t-md clay-seat-small"></div>
          <span className="text-sm">{SEAT_TYPES.GOLD.name} - ₹{SEAT_TYPES.GOLD.price}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gray-300 rounded-t-md clay-seat-small"></div>
          <span className="text-sm">{SEAT_TYPES.SILVER.name} - ₹{SEAT_TYPES.SILVER.price}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-blue-500 rounded-t-md clay-seat-small"></div>
          <span className="text-sm">Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gray-700 rounded-t-md clay-seat-small"></div>
          <span className="text-sm">Booked</span>
        </div>
      </div>
    </div>
  );
}