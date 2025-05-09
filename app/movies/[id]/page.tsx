import { MOVIES } from "@/lib/constants";
import MovieDetails from "@/components/MovieDetails";

export async function generateStaticParams() {
  return MOVIES.map((movie) => ({
    id: movie.id.toString()
  }));
}

export default function MoviePage({ params }) {
  const movie = MOVIES.find((m) => m.id === parseInt(params.id));

  if (!movie) {
    return null; // This will trigger the closest error boundary
  }

  return <MovieDetails initialMovie={movie} />;
}