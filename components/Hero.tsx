"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MOVIES } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import { Star, Clock, CalendarDays } from "lucide-react";

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % MOVIES.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  const currentMovie = MOVIES[currentIndex];
  
  return (
    <div className="relative h-[500px] md:h-[600px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentMovie.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <Image
            src={currentMovie.image}
            alt={currentMovie.title}
            fill
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>
      
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
      
      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
        <div className="container mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentMovie.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div className="flex items-center gap-2 mb-3">
                <div className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-md text-xs font-bold flex items-center">
                  <Star className="w-3 h-3 mr-1" />
                  {currentMovie.rating}/5
                </div>
                <div className="bg-gray-800 text-white px-2 py-1 rounded-md text-xs font-bold flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {currentMovie.duration}
                </div>
                <div className="bg-indigo-600 text-white px-2 py-1 rounded-md text-xs font-bold flex items-center">
                  <CalendarDays className="w-3 h-3 mr-1" />
                  {currentMovie.releaseDate}
                </div>
              </motion.div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-3">{currentMovie.title}</h1>
              <p className="text-gray-300 mb-6 max-w-xl">{currentMovie.description}</p>
              
              <Link href={`/movies/${currentMovie.id}`}>
                <motion.button 
                  className="clay-button bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-3 px-8 rounded-xl"
                  whileHover={{ y: -3 }}
                  whileTap={{ y: 0 }}
                >
                  Book Tickets
                </motion.button>
              </Link>
            </motion.div>
          </AnimatePresence>
          
          <div className="flex mt-8 space-x-2">
            {MOVIES.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex 
                    ? "bg-white w-8" 
                    : "bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}