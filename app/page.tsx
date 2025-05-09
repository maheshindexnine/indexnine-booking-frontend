import Hero from '@/components/Hero';
import MovieGrid from '@/components/MovieGrid';

export default function Home() {
  return (
    <div>
      <Hero />
      
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
          Now Showing
        </h2>
        
        <MovieGrid />
      </div>
    </div>
  );
}