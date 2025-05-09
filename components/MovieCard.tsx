"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Movie } from "@/lib/types";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={`/movies/${movie.id}`}>
      <motion.div
        className="relative h-[400px] rounded-2xl overflow-hidden cursor-pointer"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        whileHover={{ 
          scale: 1.03,
          transition: { duration: 0.2 }
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
        
        <Image
          src={movie.image}
          alt={movie.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        <div
          className="clay-card absolute inset-0 z-20 p-6 flex flex-col justify-end transition-all duration-300"
          style={{
            background: isHovered 
              ? "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 30%, rgba(0,0,0,0) 100%)" 
              : "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 30%, rgba(0,0,0,0) 100%)"
          }}
        >
          <div className="flex items-center gap-2 mb-1">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-medium text-white">{movie.rating}/5</span>
            <span className="text-sm text-gray-300 ml-2">{movie.duration}</span>
          </div>
          <h3 className="text-xl font-bold text-white">{movie.title}</h3>
          <p className="text-sm text-gray-300 mb-2">{movie.genre}</p>
          
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-2"
            >
              <p className="text-sm text-gray-300 line-clamp-2">{movie.description}</p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </Link>
  );
}