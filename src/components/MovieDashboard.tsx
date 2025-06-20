import React, { useState, useEffect } from 'react';
import { Navigation } from './Navigation';
import { SearchBar } from './SearchBar';
import { MovieCard } from './MovieCard';
import { MovieModal } from './MovieModal';
import { MovieSection } from './MovieSection';
import { MoodRecommendations } from './moodRecommendations';
import { EcoConsciousMode } from './EcoConsciousMode';
import { Movie, Genre } from '../types';
import { tmdbService, TMDBMovie } from '../utils/tmdb';
import { userAPI } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { Loader2, Filter, Play, Plus, Brain, Leaf } from 'lucide-react';

export const MovieDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [heroMovie, setHeroMovie] = useState<Movie | null>(null);
  const [showMoodRecommendations, setShowMoodRecommendations] = useState(false);
  const [showEcoMode, setShowEcoMode] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    loadInitialData();
    loadGenres();
  }, []);

  useEffect(() => {
    if (activeSection === 'search' || searchQuery) {
      if (searchQuery) {
        searchMovies(searchQuery);
      } else if (selectedGenre) {
        loadMoviesByGenre(selectedGenre);
      } else {
        loadPopularMovies();
      }
    }
  }, [searchQuery, selectedGenre, currentPage, activeSection]);

  const convertTMDBToMovie = (tmdbMovie: TMDBMovie): Movie => ({
    id: tmdbMovie.id,
    title: tmdbMovie.title,
    overview: tmdbMovie.overview,
    poster_path: tmdbMovie.poster_path,
    backdrop_path: tmdbMovie.backdrop_path,
    release_date: tmdbMovie.release_date,
    vote_average: tmdbMovie.vote_average,
    vote_count: tmdbMovie.vote_count,
    runtime: tmdbMovie.runtime,
    genres: tmdbMovie.genres,
    credits: tmdbMovie.credits ? {
      cast: tmdbMovie.credits.cast,
      crew: []
    } : undefined
  });

  const loadInitialData = async () => {
    setLoading(true);
    try {
      const [popularResponse, trendingResponse, topRatedResponse, upcomingResponse] = await Promise.all([
        tmdbService.getPopularMovies(1),
        tmdbService.getTrendingMovies('week'),
        tmdbService.getTopRatedMovies(1),
        tmdbService.getUpcomingMovies(1)
      ]);

      const popularMovies = popularResponse.results.map(convertTMDBToMovie);
      setMovies(popularMovies);
      setTrendingMovies(trendingResponse.results.slice(0, 10).map(convertTMDBToMovie));
      setTopRatedMovies(topRatedResponse.results.slice(0, 10).map(convertTMDBToMovie));
      setUpcomingMovies(upcomingResponse.results.slice(0, 10).map(convertTMDBToMovie));
      setTotalPages(Math.min(popularResponse.total_pages, 500));
      
      // Set hero movie
      if (popularMovies.length > 0) {
        setHeroMovie(popularMovies[0]);
      }
    } catch (error) {
      console.error('Error loading initial data:', error);
    }
    setLoading(false);
  };

  const loadGenres = async () => {
    try {
      const response = await tmdbService.getGenres();
      setGenres(response.genres);
    } catch (error) {
      console.error('Error loading genres:', error);
    }
  };

  const loadPopularMovies = async () => {
    setLoading(true);
    try {
      const response = await tmdbService.getPopularMovies(currentPage);
      setMovies(response.results.map(convertTMDBToMovie));
      setTotalPages(Math.min(response.total_pages, 500));
    } catch (error) {
      console.error('Error loading popular movies:', error);
    }
    setLoading(false);
  };

  const searchMovies = async (query: string) => {
    setLoading(true);
    try {
      const response = await tmdbService.searchMovies(query, currentPage);
      setMovies(response.results.map(convertTMDBToMovie));
      setTotalPages(Math.min(response.total_pages, 500));
    } catch (error) {
      console.error('Error searching movies:', error);
    }
    setLoading(false);
  };

  const loadMoviesByGenre = async (genreId: number) => {
    setLoading(true);
    try {
      const response = await tmdbService.getMoviesByGenre(genreId, currentPage);
      setMovies(response.results.map(convertTMDBToMovie));
      setTotalPages(Math.min(response.total_pages, 500));
    } catch (error) {
      console.error('Error loading movies by genre:', error);
    }
    setLoading(false);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSelectedGenre(null);
    setCurrentPage(1);
    if (query) {
      setActiveSection('search');
    }
  };

  const handleGenreFilter = (genreId: number | null) => {
    setSelectedGenre(genreId);
    setSearchQuery('');
    setCurrentPage(1);
    setActiveSection('search');
  };

  const handleMovieClick = async (movie: Movie) => {
    try {
      const detailedMovie = await tmdbService.getMovieDetails(movie.id);
      setSelectedMovie(convertTMDBToMovie(detailedMovie));
    } catch (error) {
      console.error('Error loading movie details:', error);
      setSelectedMovie(movie);
    }
  };

  const handleFavorite = async (movie: Movie) => {
    if (!user) return;

    try {
      const isFavorite = user.favorites.some(fav => fav.movieId === movie.id);
      
      if (isFavorite) {
        await userAPI.removeFromFavorites(movie.id);
      } else {
        await userAPI.addToFavorites(movie.id, movie.title, movie.poster_path);
      }
      
      window.location.reload();
    } catch (error) {
      console.error('Error updating favorites:', error);
    }
  };

  const handleWatchlist = async (movie: Movie) => {
    if (!user) return;

    try {
      const isInWatchlist = user.watchlist.some(item => item.movieId === movie.id);
      
      if (isInWatchlist) {
        await userAPI.removeFromWatchlist(movie.id);
      } else {
        await userAPI.addToWatchlist(movie.id, movie.title, movie.poster_path);
      }
      
      window.location.reload();
    } catch (error) {
      console.error('Error updating watchlist:', error);
    }
  };

  const getDisplayedMovies = () => {
    switch (activeSection) {
      case 'favorites':
        return user?.favorites.map(fav => ({
          id: fav.movieId,
          title: fav.title,
          poster_path: fav.posterPath,
          overview: '',
          backdrop_path: '',
          release_date: '',
          vote_average: 0,
          vote_count: 0
        } as Movie)) || [];
      case 'watchlist':
        return user?.watchlist.map(item => ({
          id: item.movieId,
          title: item.title,
          poster_path: item.posterPath,
          overview: '',
          backdrop_path: '',
          release_date: '',
          vote_average: 0,
          vote_count: 0
        } as Movie)) || [];
      default:
        return movies;
    }
  };

  const renderHeroSection = () => {
    if (!heroMovie) return null;

    const backdropUrl = heroMovie.backdrop_path
      ? `https://image.tmdb.org/t/p/w1280${heroMovie.backdrop_path}`
      : 'https://images.pexels.com/photos/269140/pexels-photo-269140.jpeg';

    return (
      <div className="relative h-[50vh] sm:h-[60vh] lg:h-[70vh] mb-8">
        <img
          src={backdropUrl}
          alt={heroMovie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="absolute bottom-8 left-4 sm:left-8 right-4 sm:right-8">
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-4">{heroMovie.title}</h1>
          <p className="text-gray-300 text-sm sm:text-base lg:text-lg mb-6 max-w-2xl line-clamp-3">
            {heroMovie.overview}
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => handleMovieClick(heroMovie)}
              className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded font-bold hover:bg-gray-200 transition-colors"
            >
              <Play className="w-5 h-5 fill-current" />
              More Info
            </button>
            <button
              onClick={() => handleWatchlist(heroMovie)}
              className="flex items-center gap-2 bg-gray-600/70 text-white px-6 py-3 rounded font-bold hover:bg-gray-600 transition-colors"
            >
              <Plus className="w-5 h-5" />
              My List
            </button>
            <button
              onClick={() => setShowMoodRecommendations(true)}
              className="flex items-center gap-2 bg-purple-600/70 text-white px-6 py-3 rounded font-bold hover:bg-purple-600 transition-colors"
            >
              <Brain className="w-5 h-5" />
              Mood Match
            </button>
            <button
              onClick={() => setShowEcoMode(true)}
              className="flex items-center gap-2 bg-green-600/70 text-white px-6 py-3 rounded font-bold hover:bg-green-600 transition-colors"
            >
              <Leaf className="w-5 h-5" />
              Eco Mode
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderHomeContent = () => (
    <div>
      {renderHeroSection()}
      
      <div className="space-y-8">
        <MovieSection
          title="Trending Now"
          movies={trendingMovies}
          onMovieClick={handleMovieClick}
          onFavorite={handleFavorite}
          onWatchlist={handleWatchlist}
          user={user}
        />

        <MovieSection
          title="Top Rated"
          movies={topRatedMovies}
          onMovieClick={handleMovieClick}
          onFavorite={handleFavorite}
          onWatchlist={handleWatchlist}
          user={user}
        />

        <MovieSection
          title="Coming Soon"
          movies={upcomingMovies}
          onMovieClick={handleMovieClick}
          onFavorite={handleFavorite}
          onWatchlist={handleWatchlist}
          user={user}
        />
      </div>
    </div>
  );

  const renderSearchContent = () => (
    <div className="px-4 sm:px-0">
      <SearchBar onSearch={handleSearch} />
      
      {/* Special Features */}
      <div className="mb-8 flex flex-wrap gap-4 justify-center">
        <button
          onClick={() => setShowMoodRecommendations(true)}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          <Brain className="w-5 h-5" />
          Mood-Based Recommendations
        </button>
        <button
          onClick={() => setShowEcoMode(true)}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          <Leaf className="w-5 h-5" />
          Eco-Conscious Viewing
        </button>
      </div>
      
      {/* Genre Filter */}
      <div className="mb-8">
        <h3 className="text-white font-semibold mb-4">Browse by Genre</h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleGenreFilter(null)}
            className={`px-4 py-2 rounded-full text-sm transition-colors ${
              selectedGenre === null
                ? 'bg-white text-black'
                : 'bg-gray-700 text-white hover:bg-gray-600'
            }`}
          >
            All
          </button>
          {genres.map((genre) => (
            <button
              key={genre.id}
              onClick={() => handleGenreFilter(genre.id)}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                selectedGenre === genre.id
                  ? 'bg-white text-black'
                  : 'bg-gray-700 text-white hover:bg-gray-600'
              }`}
            >
              {genre.name}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-white" />
        </div>
      ) : movies.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg">No movies found</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onMovieClick={handleMovieClick}
              onFavorite={handleFavorite}
              onWatchlist={handleWatchlist}
              isFavorite={user?.favorites.some(fav => fav.movieId === movie.id) || false}
              isInWatchlist={user?.watchlist.some(item => item.movieId === movie.id) || false}
            />
          ))}
        </div>
      )}
    </div>
  );

  const renderListContent = (type: 'favorites' | 'watchlist') => {
    const displayedMovies = getDisplayedMovies();
    const title = type === 'favorites' ? 'My List' : 'Watchlist';

    if (displayedMovies.length === 0) {
      return (
        <div className="text-center py-20 px-4">
          <p className="text-gray-400 text-xl mb-2">Your {title.toLowerCase()} is empty</p>
          <p className="text-gray-500">
            Add movies to see them here
          </p>
        </div>
      );
    }

    return (
      <div className="px-4 sm:px-0">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-8">{title}</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {displayedMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onMovieClick={handleMovieClick}
              onFavorite={handleFavorite}
              onWatchlist={handleWatchlist}
              isFavorite={user?.favorites.some(fav => fav.movieId === movie.id) || false}
              isInWatchlist={user?.watchlist.some(item => item.movieId === movie.id) || false}
            />
          ))}
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return renderHomeContent();
      case 'search':
        return renderSearchContent();
      case 'favorites':
        return renderListContent('favorites');
      case 'watchlist':
        return renderListContent('watchlist');
      default:
        return renderHomeContent();
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Navigation activeSection={activeSection} onSectionChange={setActiveSection} />
      
      <main className="max-w-7xl mx-auto pb-8">
        {renderContent()}
      </main>

      {/* Movie Modal */}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          isOpen={!!selectedMovie}
          onClose={() => setSelectedMovie(null)}
          onFavorite={handleFavorite}
          onWatchlist={handleWatchlist}
          onMovieClick={handleMovieClick}
          isFavorite={user?.favorites.some(fav => fav.movieId === selectedMovie.id) || false}
          isInWatchlist={user?.watchlist.some(item => item.movieId === selectedMovie.id) || false}
        />
      )}

      {/* Mood Recommendations Modal */}
      <MoodRecommendations
        isOpen={showMoodRecommendations}
        onClose={() => setShowMoodRecommendations(false)}
        onMovieClick={handleMovieClick}
        onFavorite={handleFavorite}
        onWatchlist={handleWatchlist}
        user={user}
      />

      {/* Eco-Conscious Mode Modal */}
      <EcoConsciousMode
        isOpen={showEcoMode}
        onClose={() => setShowEcoMode(false)}
        onMovieClick={handleMovieClick}
        onFavorite={handleFavorite}
        onWatchlist={handleWatchlist}
        user={user}
      />
    </div>
  );
};