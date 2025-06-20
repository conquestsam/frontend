import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Star, Heart, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { tmdbService } from '../../utils/tmdb';
import { Movie } from '../../types';

export const MovieShowcase: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState('trending');

  const categories = [
    { id: 'trending', label: 'Trending Now', color: 'from-red-500 to-pink-500' },
    { id: 'top-rated', label: 'Top Rated', color: 'from-yellow-500 to-orange-500' },
    { id: 'upcoming', label: 'Coming Soon', color: 'from-blue-500 to-purple-500' }
  ];

  useEffect(() => {
    loadMovies();
  }, [activeCategory]);

  const loadMovies = async () => {
    setLoading(true);
    try {
      let response;
      switch (activeCategory) {
        case 'trending':
          response = await tmdbService.getTrendingMovies('week');
          break;
        case 'top-rated':
          response = await tmdbService.getTopRatedMovies(1);
          break;
        case 'upcoming':
          response = await tmdbService.getUpcomingMovies(1);
          break;
        default:
          response = await tmdbService.getPopularMovies(1);
      }

      const convertedMovies = response.results.slice(0, 12).map(tmdbMovie => ({
        id: tmdbMovie.id,
        title: tmdbMovie.title,
        overview: tmdbMovie.overview,
        poster_path: tmdbMovie.poster_path,
        backdrop_path: tmdbMovie.backdrop_path,
        release_date: tmdbMovie.release_date,
        vote_average: tmdbMovie.vote_average,
        vote_count: tmdbMovie.vote_count
      }));

      setMovies(convertedMovies);
    } catch (error) {
      console.error('Error loading movies:', error);
    }
    setLoading(false);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, movies.length - 5));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.max(1, movies.length - 5)) % Math.max(1, movies.length - 5));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section id="showcase" className="py-20 lg:py-32 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-blue-600/30 rounded-full px-6 py-2 mb-6">
            <Play className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-white">Live Recommendations</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Discover Your Next
            <span className="block bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Favorite Movie
            </span>
          </h2>
          
          <p className="text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            See our AI recommendation engine in action with real-time movie suggestions
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                    : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Movie Carousel */}
        <div className="relative">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
            </div>
          ) : (
            <>
              {/* Navigation Buttons */}
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-black/50 hover:bg-black/70 rounded-full text-white transition-all duration-300 backdrop-blur-sm"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-black/50 hover:bg-black/70 rounded-full text-white transition-all duration-300 backdrop-blur-sm"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Movie Cards */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="overflow-hidden"
              >
                <motion.div
                  className="flex gap-6 transition-transform duration-500 ease-out"
                  style={{
                    transform: `translateX(-${currentIndex * (100 / Math.min(6, movies.length))}%)`
                  }}
                >
                  {movies.map((movie, index) => (
                    <motion.div
                      key={movie.id}
                      variants={itemVariants}
                      className="flex-shrink-0 w-64 group cursor-pointer"
                    >
                      <div className="relative overflow-hidden rounded-xl bg-gray-800 aspect-[2/3] mb-4">
                        <img
                          src={
                            movie.poster_path
                              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                              : 'https://images.pexels.com/photos/274937/pexels-photo-274937.jpeg'
                          }
                          alt={movie.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                          <div className="flex justify-between items-start">
                            <div className="flex items-center gap-1 bg-black/50 rounded px-2 py-1">
                              <Star className="w-3 h-3 text-yellow-400 fill-current" />
                              <span className="text-white text-xs font-medium">
                                {movie.vote_average.toFixed(1)}
                              </span>
                            </div>
                            <div className="flex gap-2">
                              <button className="p-2 bg-black/50 hover:bg-red-600 rounded-full transition-colors">
                                <Heart className="w-4 h-4 text-white" />
                              </button>
                              <button className="p-2 bg-black/50 hover:bg-white hover:text-black rounded-full transition-colors">
                                <Plus className="w-4 h-4 text-white" />
                              </button>
                            </div>
                          </div>
                          
                          <div>
                            <button className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                              <Play className="w-4 h-4 fill-current" />
                              More Info
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <h3 className="text-white font-semibold mb-2 line-clamp-2">{movie.title}</h3>
                        <p className="text-gray-400 text-sm">
                          {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </>
          )}
        </div>

        {/* AI Insights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 p-8 bg-gradient-to-r from-purple-600/10 to-blue-600/10 backdrop-blur-sm rounded-2xl border border-purple-600/20"
        >
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              🤖 AI Recommendation Insights
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Our AI analyzes over 50 factors including genre preferences, mood indicators, 
              viewing history, and real-time emotional state to deliver these personalized recommendations.
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: "Mood Match", value: "94%" },
                { label: "Genre Accuracy", value: "97%" },
                { label: "User Satisfaction", value: "96%" },
                { label: "Discovery Rate", value: "89%" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};