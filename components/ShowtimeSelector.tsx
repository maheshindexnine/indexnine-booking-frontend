"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SHOWTIMES } from "@/lib/constants";
import { Showtime } from "@/lib/types";
import { Clock } from "lucide-react";

interface ShowtimeSelectorProps {
  onShowtimeSelect: (showtimeId: number) => void;
}

export default function ShowtimeSelector({ onShowtimeSelect }: ShowtimeSelectorProps) {
  const [selectedShowtimeId, setSelectedShowtimeId] = useState<number | null>(null);

  const handleShowtimeSelect = (showtime: Showtime) => {
    setSelectedShowtimeId(showtime.id);
    onShowtimeSelect(showtime.id);
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3">Select Showtime</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {SHOWTIMES.map((showtime) => (
          <motion.button
            key={showtime.id}
            onClick={() => handleShowtimeSelect(showtime)}
            className={`clay-button flex items-center justify-center py-3 px-3 rounded-xl 
              transition-all duration-200 ${
              selectedShowtimeId === showtime.id
                ? "bg-gradient-to-br from-rose-500 to-pink-600 text-white"
                : "bg-gradient-to-br from-gray-100 to-white text-gray-700 hover:from-gray-200 hover:to-gray-100"
            }`}
            whileHover={{ y: -3 }}
            whileTap={{ y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: showtime.id * 0.05 }}
          >
            <Clock className="w-4 h-4 mr-2" />
            <span className="font-medium">{showtime.time}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}