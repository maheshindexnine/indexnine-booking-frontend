"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { THEATERS } from "@/lib/constants";
import { Theater } from "@/lib/types";
import { MapPin } from "lucide-react";

interface TheaterSelectorProps {
  onTheaterSelect: (theaterId: number) => void;
}

export default function TheaterSelector({ onTheaterSelect }: TheaterSelectorProps) {
  const [selectedTheaterId, setSelectedTheaterId] = useState<number | null>(null);

  const handleTheaterSelect = (theater: Theater) => {
    setSelectedTheaterId(theater.id);
    onTheaterSelect(theater.id);
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3">Select Theater</h3>
      <div className="space-y-3">
        {THEATERS.map((theater) => (
          <motion.button
            key={theater.id}
            onClick={() => handleTheaterSelect(theater)}
            className={`clay-button w-full text-left p-4 rounded-xl transition-all 
              ${
                selectedTheaterId === theater.id
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                  : "bg-gradient-to-r from-gray-100 to-white text-gray-700 hover:from-gray-200 hover:to-gray-100"
              }`}
            whileHover={{ x: 3 }}
            whileTap={{ x: 0 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: theater.id * 0.1 }}
          >
            <div className="flex items-start">
              <div className="flex-1">
                <h4 className="font-bold text-lg">{theater.name}</h4>
                <div className="flex items-center mt-1">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm">{theater.location}</span>
                </div>
              </div>
              {selectedTheaterId === theater.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-6 h-6 bg-white rounded-full flex items-center justify-center"
                >
                  <div className="w-3 h-3 bg-indigo-600 rounded-full"></div>
                </motion.div>
              )}
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}