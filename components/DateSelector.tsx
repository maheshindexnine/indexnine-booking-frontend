"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { DATES } from "@/lib/constants";
import { Date as DateType } from "@/lib/types";

interface DateSelectorProps {
  onDateSelect: (dateId: number) => void;
}

export default function DateSelector({ onDateSelect }: DateSelectorProps) {
  const [selectedDateId, setSelectedDateId] = useState<number | null>(null);

  const handleDateSelect = (date: DateType) => {
    setSelectedDateId(date.id);
    onDateSelect(date.id);
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3">Select Date</h3>
      <div className="flex space-x-3 overflow-x-auto pb-2 -mx-2 px-2">
        {DATES.map((date) => (
          <motion.button
            key={date.id}
            onClick={() => handleDateSelect(date)}
            className={`clay-button flex-shrink-0 flex flex-col items-center py-3 px-5 rounded-xl 
              transition-all duration-200 ${
              selectedDateId === date.id
                ? "bg-gradient-to-br from-purple-600 to-indigo-700 text-white"
                : "bg-gradient-to-br from-gray-100 to-white text-gray-700 hover:from-gray-200 hover:to-gray-100"
            }`}
            whileHover={{ y: -3 }}
            whileTap={{ y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: date.id * 0.05 }}
          >
            <span className="text-sm font-medium">{date.day}</span>
            <span className="text-xl font-bold mt-1">{date.date}</span>
            <span className="text-xs mt-1">{date.month}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}