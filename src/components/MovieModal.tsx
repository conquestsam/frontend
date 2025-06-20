import React, { useState, useEffect } from 'react';
import { X, Star, Clock, Calendar, Heart, Plus, Play } from 'lucide-react';
import { Movie } from '../types';
import { MovieCard } from './MovieCard';
import { tmdbService } from '../utils/tmdb';

interface MovieModalProps {
  movie: Movie;
  isOpen: boolean;
  onClose: () => void;
  onFavorite: (movie: Movie) => void;
  onWatchlist: (movie: Movie) => void;
  onMovieClick: (movie: Movie) => void;
  isFavorite: boolean;
  isInWatchlist: boolean;
}

export const MovieModal: React.FC<MovieModalProps> = ({
  movie,
  isOpen,
  onClose,
  onFavorite,
  onWatchlist,
  onMovieClick,
  isFavorite,
  isInWatchlist
}) => {
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([]);
  const [loadingSimilar, setLoadingSimilar] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'cast' | 'similar'>('overview');

  useEffect(() => {
    if (isOpen && movie.id) {
      loadSimilarMovies();
    }
  }, [isOpen, movie.id]);

  const loadSimilarMovies = async () => {
    setLoadingSimilar(true);
    try {
      const response = await tmdbService.getSimilarMovies(movie.id);
      const convertedMovies = response.results.slice(0, 12).map(tmdbMovie => ({
        id: tmdbMovie.id,
        title: tmdbMovie.title,
        overview: tmdbMovie.overview,
        poster_path: tmdbMovie.poster_path,
        backdrop_path: tmdbMovie.backdrop_path,
        release_date: tmdbMovie.release_date,
        vote_average: tmdbMovie.vote_average,
        vote_count: tmdbMovie.vote_count,
        runtime: tmdbMovie.runtime,
        genres: tmdbMovie.genres
      }));
      setSimilarMovies(convertedMovies);
    } catch (error) {
      console.error('Error loading similar movies:', error);
    }
    setLoadingSimilar(false);
  };

  if (!isOpen) return null;

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
    : 'https://images.pexels.com/photos/269140/pexels-photo-269140.jpeg';

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://images.pexels.com/photos/274937/pexels-photo-274937.jpeg';

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="fixed inset-0 bg-black/90 flex items-start justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-gray-900 rounded-lg max-w-4xl w-full my-8 overflow-hidden">
        {/* Header with backdrop */}
        <div className="relative h-64 sm:h-80 lg:h-96">
          <img
            src={backdropUrl}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Movie info overlay */}
          <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row gap-4">
            <img
              src={posterUrl}
              alt={movie.title}
              className="w-24 h-36 sm:w-32 sm:h-48 object-cover rounded shadow-2xl flex-shrink-0 mx-auto sm:mx-0"
            />
            <div className="text-white flex-1 text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4">{movie.title}</h1>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mb-4 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
                  <span>{movie.vote_average.toFixed(1)}</span>
                </div>
                {movie.runtime && (
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{formatRuntime(movie.runtime)}</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(movie.release_date).getFullYear()}</span>
                </div>
              </div>
              
              {/* Action buttons */}
              <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                <button
                  onClick={() => onFavorite(movie)}
                  className={`flex items-center gap-2 px-4 py-2 rounded font-medium transition-colors ${
                    isFavorite
                      ? 'bg-red-600 text-white'
                      : 'bg-white/20 text-white hover:bg-red-600'
                  }`}
                >
                  <Heart className="w-4 h-4" fill={isFavorite ? 'currentColor' : 'none'} />
                  {isFavorite ? 'Remove' : 'My List'}
                </button>
                <button
                  onClick={() => onWatchlist(movie)}
                  className={`flex items-center gap-2 px-4 py-2 rounded font-medium transition-colors ${
                    isInWatchlist
                      ? 'bg-white text-black'
                      : 'bg-white/20 text-white hover:bg-white hover:text-black'
                  }`}
                >
                  <Plus className="w-4 h-4" />
                  {isInWatchlist ? 'Added' : 'Watchlist'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          {/* Genres */}
          {movie.genres && movie.genres.length > 0 && (
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-3 py-1 bg-gray-700 text-white rounded-full text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Tabs */}
          <div className="mb-6">
            <div className="flex border-b border-gray-700 overflow-x-auto">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'cast', label: 'Cast' },
                { id: 'similar', label: 'More Like This' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 font-medium whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'text-white border-b-2 border-red-600'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="min-h-[200px]">
            {activeTab === 'overview' && (
              <div>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">{movie.overview}</p>
              </div>
            )}

            {activeTab === 'cast' && (
              <div>
                {movie.credits?.cast && movie.credits.cast.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {movie.credits.cast.slice(0, 12).map((actor) => (
                      <div key={actor.id} className="text-center">
                        <img
                          src={
                            actor.profile_path
                              ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                              : 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg'
                          }
                          alt={actor.name}
                          className="w-full aspect-square object-cover rounded mb-2"
                        />
                        <p className="text-white text-sm font-medium mb-1">{actor.name}</p>
                        <p className="text-gray-400 text-xs">{actor.character}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-center py-8">No cast information available</p>
                )}
              </div>
            )}

            {activeTab === 'similar' && (
              <div>
                {loadingSimilar ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
                  </div>
                ) : similarMovies.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {similarMovies.map((similarMovie) => (
                      <MovieCard
                        key={similarMovie.id}
                        movie={similarMovie}
                        onMovieClick={(movie) => {
                          onClose();
                          setTimeout(() => onMovieClick(movie), 100);
                        }}
                        onFavorite={onFavorite}
                        onWatchlist={onWatchlist}
                        size="small"
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-center py-8">No similar movies found</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};