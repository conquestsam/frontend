import React from 'react';
import { MovieCard } from './MovieCard';
import { Movie, User } from '../types';
import { ChevronRight } from 'lucide-react';

interface MovieSectionProps {
  title: string;
  movies: Movie[];
  onMovieClick: (movie: Movie) => void;
  onFavorite: (movie: Movie) => void;
  onWatchlist: (movie: Movie) => void;
  user: User | null;
}

export const MovieSection: React.FC<MovieSectionProps> = ({
  title,
  movies,
  onMovieClick,
  onFavorite,
  onWatchlist,
  user
}) => {
  if (movies.length === 0) return null;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4 px-4 sm:px-0">
        <h2 className="text-xl sm:text-2xl font-bold text-white">{title}</h2>
        <button className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors text-sm">
          <span>See all</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-3 px-4 sm:px-0 pb-4" style={{ width: 'max-content' }}>
          {movies.map((movie) => (
            <div key={movie.id} className="w-40 sm:w-48 flex-shrink-0">
              <MovieCard
                movie={movie}
                onMovieClick={onMovieClick}
                onFavorite={onFavorite}
                onWatchlist={onWatchlist}
                isFavorite={user?.favorites.some(fav => fav.movieId === movie.id) || false}
                isInWatchlist={user?.watchlist.some(item => item.movieId === movie.id) || false}
                size="medium"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};