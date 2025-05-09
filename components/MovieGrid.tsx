import { MOVIES } from "@/lib/constants";
import MovieCard from "./MovieCard";

export default function MovieGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {MOVIES.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}