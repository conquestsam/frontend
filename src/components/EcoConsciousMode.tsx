import React, { useState, useEffect } from 'react';
import { Leaf, Globe, Recycle, Lightbulb, Car, Utensils, X, ExternalLink, Play } from 'lucide-react';
import { Movie } from '../types';
import { tmdbService } from '../utils/tmdb';
import { MovieCard } from './MovieCard';

interface EcoConsciousModeProps {
  isOpen: boolean;
  onClose: () => void;
  onMovieClick: (movie: Movie) => void;
  onFavorite: (movie: Movie) => void;
  onWatchlist: (movie: Movie) => void;
  user: any;
}

interface EcoTip {
  category: string;
  icon: React.ComponentType<any>;
  color: string;
  tips: string[];
}

const ecoTips: EcoTip[] = [
  {
    category: 'Energy',
    icon: Lightbulb,
    color: 'bg-yellow-500',
    tips: [
      'Adjust your screen brightness to reduce energy consumption',
      'Use dark mode when available to save battery on OLED screens',
      'Stream on smaller devices when possible (phone vs TV)',
      'Turn off devices completely instead of leaving them on standby'
    ]
  },
  {
    category: 'Waste',
    icon: Recycle,
    color: 'bg-green-500',
    tips: [
      'Choose digital rentals over physical DVDs',
      'Share streaming accounts with family to reduce redundancy',
      'Recycle old electronics responsibly',
      'Opt for refurbished devices when upgrading'
    ]
  },
  {
    category: 'Transport',
    icon: Car,
    color: 'bg-blue-500',
    tips: [
      'Stream at home instead of driving to theaters when possible',
      'Walk or bike to local cinemas',
      'Carpool to movie theaters with friends',
      'Choose local film festivals over distant ones'
    ]
  },
  {
    category: 'Food',
    icon: Utensils,
    color: 'bg-orange-500',
    tips: [
      'Choose plant-based snacks while watching',
      'Support local, organic food vendors at cinemas',
      'Bring reusable water bottles to theaters',
      'Avoid single-use packaging when possible'
    ]
  }
];

const environmentalKeywords = [
  'climate', 'environment', 'nature', 'ocean', 'forest', 'wildlife', 'conservation',
  'sustainability', 'renewable', 'pollution', 'earth', 'planet', 'green', 'eco',
  'documentary', 'david attenborough', 'national geographic'
];

const ecoResources = [
  {
    name: 'Climate Action Network',
    url: 'https://climatenetwork.org',
    description: 'Global network of climate organizations'
  },
  {
    name: 'Earth Day Network',
    url: 'https://earthday.org',
    description: 'Environmental action and education'
  },
  {
    name: 'Greenpeace',
    url: 'https://greenpeace.org',
    description: 'Environmental activism and campaigns'
  },
  {
    name: 'World Wildlife Fund',
    url: 'https://worldwildlife.org',
    description: 'Wildlife conservation and protection'
  }
];

export const EcoConsciousMode: React.FC<EcoConsciousModeProps> = ({
  isOpen,
  onClose,
  onMovieClick,
  onFavorite,
  onWatchlist,
  user
}) => {
  const [ecoMovies, setEcoMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'movies' | 'tips' | 'action'>('movies');

  useEffect(() => {
    if (isOpen) {
      loadEcoFriendlyContent();
    }
  }, [isOpen]);

  const loadEcoFriendlyContent = async () => {
    setLoading(true);
    try {
      // Search for environmental documentaries and movies
      const searches = [
        'climate change',
        'environment',
        'nature documentary',
        'ocean',
        'wildlife'
      ];

      const allMovies: Movie[] = [];

      for (const query of searches) {
        try {
          const response = await tmdbService.searchMovies(query, 1);
          const convertedMovies = response.results.slice(0, 4).map(tmdbMovie => ({
            id: tmdbMovie.id,
            title: tmdbMovie.title,
            overview: tmdbMovie.overview,
            poster_path: tmdbMovie.poster_path,
            backdrop_path: tmdbMovie.backdrop_path,
            release_date: tmdbMovie.release_date,
            vote_average: tmdbMovie.vote_average,
            vote_count: tmdbMovie.vote_count
          }));
          allMovies.push(...convertedMovies);
        } catch (error) {
          console.error(`Error searching for ${query}:`, error);
        }
      }

      // Remove duplicates and filter for environmental content
      const uniqueMovies = allMovies.filter((movie, index, self) => 
        index === self.findIndex(m => m.id === movie.id) &&
        (environmentalKeywords.some(keyword => 
          movie.title.toLowerCase().includes(keyword) ||
          movie.overview.toLowerCase().includes(keyword)
        ))
      );

      setEcoMovies(uniqueMovies.slice(0, 12));
    } catch (error) {
      console.error('Error loading eco-friendly content:', error);
    }
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 flex items-start justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-gray-900 rounded-lg max-w-6xl w-full my-8 overflow-hidden">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-green-600 to-blue-600 p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/30 hover:bg-black/50 rounded-full text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="flex items-center gap-3 mb-4">
            <Leaf className="w-8 h-8 text-white" />
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Eco-Conscious Viewing</h1>
          </div>
          <p className="text-green-100">
            Discover environmental content and learn how to make your viewing habits more sustainable
          </p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-700">
          <div className="flex overflow-x-auto">
            {[
              { id: 'movies', label: 'Environmental Content', icon: Play },
              { id: 'tips', label: 'Sustainable Viewing', icon: Lightbulb },
              { id: 'action', label: 'Take Action', icon: Globe }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'text-white border-b-2 border-green-500 bg-gray-800'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-6">
          {/* Environmental Content Tab */}
          {activeTab === 'movies' && (
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-white mb-2">
                  Environmental Movies & Documentaries
                </h2>
                <p className="text-gray-400">
                  Explore content that raises awareness about our planet and environmental issues
                </p>
              </div>

              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                </div>
              ) : ecoMovies.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {ecoMovies.map((movie) => (
                    <MovieCard
                      key={movie.id}
                      movie={movie}
                      onMovieClick={onMovieClick}
                      onFavorite={onFavorite}
                      onWatchlist={onWatchlist}
                      isFavorite={user?.favorites.some((fav: any) => fav.movieId === movie.id) || false}
                      isInWatchlist={user?.watchlist.some((item: any) => item.movieId === movie.id) || false}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Leaf className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">No environmental content found. Try searching manually!</p>
                </div>
              )}
            </div>
          )}

          {/* Sustainable Viewing Tips Tab */}
          {activeTab === 'tips' && (
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-white mb-2">
                  Make Your Viewing More Sustainable
                </h2>
                <p className="text-gray-400">
                  Simple tips to reduce your environmental impact while enjoying entertainment
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {ecoTips.map((category, index) => {
                  const Icon = category.icon;
                  return (
                    <div key={index} className="bg-gray-800 rounded-lg p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`${category.color} p-2 rounded-lg`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-white">{category.category}</h3>
                      </div>
                      <ul className="space-y-2">
                        {category.tips.map((tip, tipIndex) => (
                          <li key={tipIndex} className="text-gray-300 text-sm flex items-start gap-2">
                            <span className="text-green-400 mt-1">•</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>

              {/* Impact Stats */}
              <div className="mt-8 bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">🌍 Your Impact</h3>
                <div className="grid sm:grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-400">30%</div>
                    <div className="text-sm text-gray-300">Energy saved with dark mode</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-400">50%</div>
                    <div className="text-sm text-gray-300">Less CO2 vs physical media</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-400">75%</div>
                    <div className="text-sm text-gray-300">Waste reduction potential</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Take Action Tab */}
          {activeTab === 'action' && (
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-white mb-2">
                  Take Action for the Environment
                </h2>
                <p className="text-gray-400">
                  Connect with organizations and initiatives making a real difference
                </p>
              </div>

              <div className="space-y-6">
                {/* Environmental Organizations */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">🌱 Environmental Organizations</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {ecoResources.map((resource, index) => (
                      <div key={index} className="bg-gray-800 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-white">{resource.name}</h4>
                          <ExternalLink className="w-4 h-4 text-gray-400" />
                        </div>
                        <p className="text-gray-400 text-sm mb-3">{resource.description}</p>
                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 text-sm font-medium"
                        >
                          Visit Website
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Local Actions */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">🏠 Local Actions You Can Take</h3>
                  <div className="bg-gray-800 rounded-lg p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-white mb-3">At Home</h4>
                        <ul className="space-y-2 text-sm text-gray-300">
                          <li>• Switch to renewable energy providers</li>
                          <li>• Reduce, reuse, recycle electronics</li>
                          <li>• Use energy-efficient appliances</li>
                          <li>• Start composting organic waste</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-white mb-3">In Your Community</h4>
                        <ul className="space-y-2 text-sm text-gray-300">
                          <li>• Join local environmental groups</li>
                          <li>• Participate in community cleanups</li>
                          <li>• Support eco-friendly businesses</li>
                          <li>• Advocate for green policies</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Climate Action */}
                <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-6 text-white">
                  <h3 className="text-lg font-semibold mb-4">🌍 Join the Climate Movement</h3>
                  <p className="mb-4 opacity-90">
                    Every action counts in the fight against climate change. Start with small changes 
                    and inspire others to join the movement for a sustainable future.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      Calculate Your Carbon Footprint
                    </button>
                    <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      Find Local Events
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};