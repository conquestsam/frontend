import React, { useState } from 'react';
import { Heart, Plus, Star, Play, Info } from 'lucide-react';
import { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
  onMovieClick: (movie: Movie) => void;
  onFavorite?: (movie: Movie) => void;
  onWatchlist?: (movie: Movie) => void;
  isFavorite?: boolean;
  isInWatchlist?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  onMovieClick,
  onFavorite,
  onWatchlist,
  isFavorite = false,
  isInWatchlist = false,
  size = 'medium'
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const imageUrl = movie.poster_path && !imageError
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://images.pexels.com/photos/274937/pexels-photo-274937.jpeg';

  const sizeClasses = {
    small: 'w-full aspect-[2/3]',
    medium: 'w-full aspect-[2/3]',
    large: 'w-full aspect-[2/3]'
  };

  return (
    <div className="group relative cursor-pointer transform transition-all duration-300 hover:scale-105 hover:z-10">
      <div className={`${sizeClasses[size]} relative overflow-hidden rounded-md bg-gray-800`}>
        {/* Loading skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-700 animate-pulse flex items-center justify-center">
            <div className="w-12 h-12 bg-gray-600 rounded-full animate-pulse"></div>
          </div>
        )}
        
        <img
          src={imageUrl}
          alt={movie.title}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          onClick={() => onMovieClick(movie)}
        />
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-between p-4">
          {/* Top actions */}
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-1 bg-black/50 rounded px-2 py-1">
              <Star className="w-3 h-3 text-yellow-400" fill="currentColor" />
              <span className="text-white text-xs font-medium">{movie.vote_average.toFixed(1)}</span>
            </div>
            <div className="flex gap-2">
              {onFavorite && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onFavorite(movie);
                  }}
                  className={`p-2 rounded-full transition-all duration-200 ${
                    isFavorite
                      ? 'bg-red-600 text-white'
                      : 'bg-black/50 text-white hover:bg-red-600'
                  }`}
                >
                  <Heart className="w-4 h-4" fill={isFavorite ? 'currentColor' : 'none'} />
                </button>
              )}
              {onWatchlist && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onWatchlist(movie);
                  }}
                  className={`p-2 rounded-full transition-all duration-200 ${
                    isInWatchlist
                      ? 'bg-white text-black'
                      : 'bg-black/50 text-white hover:bg-white hover:text-black'
                  }`}
                >
                  <Plus className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Bottom info */}
          <div>
            <h3 className="text-white font-bold text-sm mb-2 line-clamp-2">{movie.title}</h3>
            <div className="flex items-center justify-between text-xs text-gray-300">
              <span>{movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}</span>
              <button
                onClick={() => onMovieClick(movie)}
                className="flex items-center gap-1 bg-white/20 hover:bg-white/30 rounded px-2 py-1 transition-colors"
              >
                <Info className="w-3 h-3" />
                <span>More</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};