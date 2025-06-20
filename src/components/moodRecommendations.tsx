import React, { useState, useRef, useEffect } from 'react';
import { Brain, Heart, Smile, Frown, Zap, Coffee, Sun, Moon, Camera, Mic, X, Play, Info } from 'lucide-react';
import { Movie } from '../types';
import { tmdbService } from '../utils/tmdb';
import { MovieCard } from './MovieCard';

interface MoodRecommendationsProps {
  isOpen: boolean;
  onClose: () => void;
  onMovieClick: (movie: Movie) => void;
  onFavorite: (movie: Movie) => void;
  onWatchlist: (movie: Movie) => void;
  user: any;
}

interface MoodData {
  name: string;
  icon: React.ComponentType<any>;
  color: string;
  genres: number[];
  keywords: string[];
  affirmation: string;
  tips: string[];
}

const moodTypes: Record<string, MoodData> = {
  happy: {
    name: 'Happy',
    icon: Smile,
    color: 'bg-yellow-500',
    genres: [35, 10751, 10402], // Comedy, Family, Music
    keywords: ['happy', 'joy', 'excited', 'great', 'amazing', 'wonderful', 'fantastic'],
    affirmation: "Your positive energy is contagious! Let's celebrate with some feel-good content.",
    tips: [
      'Share your joy with friends and family',
      'Try a new hobby or activity',
      'Practice gratitude journaling',
      'Spread kindness to others'
    ]
  },
  sad: {
    name: 'Sad',
    icon: Frown,
    color: 'bg-blue-500',
    genres: [18, 10749, 10751], // Drama, Romance, Family
    keywords: ['sad', 'down', 'depressed', 'upset', 'crying', 'lonely', 'hurt'],
    affirmation: "It's okay to feel sad. You're not alone, and this feeling will pass.",
    tips: [
      'Reach out to a trusted friend or family member',
      'Practice self-compassion',
      'Consider gentle exercise like walking',
      'Allow yourself to feel without judgment'
    ]
  },
  anxious: {
    name: 'Anxious',
    icon: Zap,
    color: 'bg-orange-500',
    genres: [16, 10751, 99], // Animation, Family, Documentary
    keywords: ['anxious', 'worried', 'nervous', 'stressed', 'panic', 'overwhelmed', 'tense'],
    affirmation: "You are stronger than your anxiety. Take deep breaths and be gentle with yourself.",
   tips: [
      'Practice deep breathing exercises',
      'Try progressive muscle relaxation',
      'Limit caffeine intake',
      'Focus on what you can control'
    ]
  }, 
  stressed: {
    name: 'Stressed',
    icon: Coffee,
    color: 'bg-red-500',
    genres: [35, 16, 10402], // Comedy, Animation, Music
    keywords: ['stressed', 'pressure', 'overwhelmed', 'busy', 'exhausted', 'burned out'],
    affirmation: "You're handling more than you realize. Take a moment to breathe and reset.",
    tips: [
      'Take regular breaks throughout your day',
      'Practice time management techniques',
      'Delegate tasks when possible',
      'Prioritize self-care activities'
    ]
  },
  calm: {
    name: 'Calm',
    icon: Moon,
    color: 'bg-green-500',
    genres: [99, 18, 10752], // Documentary, Drama, War
    keywords: ['calm', 'peaceful', 'relaxed', 'serene', 'tranquil', 'centered'],
    affirmation: "Your inner peace is a gift. Enjoy this moment of tranquility.",
    tips: [
      'Practice mindfulness meditation',
      'Spend time in nature',
      'Read a good book',
      'Listen to calming music'
    ]
  },
  energetic: {
    name: 'Energetic',
    icon: Sun,
    color: 'bg-pink-500',
    genres: [28, 12, 10402], // Action, Adventure, Music
    keywords: ['energetic', 'pumped', 'motivated', 'active', 'hyper', 'excited'],
    affirmation: "Your energy is powerful! Channel it into something meaningful.",
    tips: [
      'Engage in physical exercise',
      'Start a creative project',
      'Connect with friends',
      'Set and work toward goals'
    ]
  }
};

export const MoodRecommendations: React.FC<MoodRecommendationsProps> = ({
  isOpen,
  onClose,
  onMovieClick,
  onFavorite,
  onWatchlist,
  user
}) => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [textInput, setTextInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recommendations, setRecommendations] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const analyzeMoodFromText = (text: string): string | null => {
    const lowerText = text.toLowerCase();
    
    for (const [mood, data] of Object.entries(moodTypes)) {
      if (data.keywords.some(keyword => lowerText.includes(keyword))) {
        return mood;
      }
    }
    
    return null;
  };

  const handleTextAnalysis = async () => {
    if (!textInput.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const detectedMood = analyzeMoodFromText(textInput) || 'calm';
    setSelectedMood(detectedMood);
    setIsAnalyzing(false);
    
    await loadRecommendations(detectedMood);
  };

  const loadRecommendations = async (mood: string) => {
    setLoading(true);
    try {
      const moodData = moodTypes[mood];
      const genreId = moodData.genres[Math.floor(Math.random() * moodData.genres.length)];
      
      const response = await tmdbService.getMoviesByGenre(genreId, 1);
      const convertedMovies = response.results.slice(0, 8).map(tmdbMovie => ({
        id: tmdbMovie.id,
        title: tmdbMovie.title,
        overview: tmdbMovie.overview,
        poster_path: tmdbMovie.poster_path,
        backdrop_path: tmdbMovie.backdrop_path,
        release_date: tmdbMovie.release_date,
        vote_average: tmdbMovie.vote_average,
        vote_count: tmdbMovie.vote_count
      }));
      
      setRecommendations(convertedMovies);
    } catch (error) {
      console.error('Error loading mood recommendations:', error);
    }
    setLoading(false);
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: false 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setShowCamera(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Camera access denied or not available');
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setShowCamera(false);
  };

  const startVoiceRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      mediaRecorder.start();
      setIsRecording(true);
      
      // Stop recording after 5 seconds
      setTimeout(() => {
        if (mediaRecorderRef.current && isRecording) {
          mediaRecorder.stop();
          stream.getTracks().forEach(track => track.stop());
          setIsRecording(false);
          
          // Simulate mood detection from voice
          const randomMoods = Object.keys(moodTypes);
          const detectedMood = randomMoods[Math.floor(Math.random() * randomMoods.length)];
          setSelectedMood(detectedMood);
          loadRecommendations(detectedMood);
        }
      }, 5000);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Microphone access denied or not available');
    }
  };

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    loadRecommendations(mood);
  };

  if (!isOpen) return null;

  const currentMoodData = selectedMood ? moodTypes[selectedMood] : null;

  return (
    <div className="fixed inset-0 bg-black/90 flex items-start justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-gray-900 rounded-lg max-w-6xl w-full my-8 overflow-hidden">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/30 hover:bg-black/50 rounded-full text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="flex items-center gap-3 mb-4">
            <Brain className="w-8 h-8 text-white" />
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Mood-Based Recommendations</h1>
          </div>
          <p className="text-purple-100">
            Let us help you find the perfect content based on how you're feeling right now
          </p>
        </div>

        <div className="p-6">
          {!selectedMood ? (
            <div className="space-y-8">
              {/* Mood Selection */}
              <div>
                <h2 className="text-xl font-semibold text-white mb-4">How are you feeling today?</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                  {Object.entries(moodTypes).map(([key, mood]) => {
                    const Icon = mood.icon;
                    return (
                      <button
                        key={key}
                        onClick={() => handleMoodSelect(key)}
                        className={`${mood.color} hover:opacity-80 text-white p-4 rounded-lg transition-all transform hover:scale-105 flex flex-col items-center gap-2`}
                      >
                        <Icon className="w-8 h-8" />
                        <span className="font-medium">{mood.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Text Analysis */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Or describe how you're feeling</h3>
                <div className="space-y-4">
                  <textarea
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    placeholder="Tell us about your mood, feelings, or what kind of day you're having..."
                    className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 resize-none"
                    rows={4}
                  />
                  <button
                    onClick={handleTextAnalysis}
                    disabled={!textInput.trim() || isAnalyzing}
                    className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Brain className="w-4 h-4" />
                        Analyze My Mood
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Advanced Options */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Advanced Mood Detection</h3>
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={startCamera}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                  >
                    <Camera className="w-4 h-4" />
                    Facial Expression Analysis
                  </button>
                  <button
                    onClick={startVoiceRecording}
                    disabled={isRecording}
                    className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                  >
                    <Mic className="w-4 h-4" />
                    {isRecording ? 'Recording...' : 'Voice Tone Analysis'}
                  </button>
                </div>
                
                {showCamera && (
                  <div className="mt-4 relative">
                    <video
                      ref={videoRef}
                      autoPlay
                      muted
                      className="w-full max-w-md rounded-lg"
                    />
                    <button
                      onClick={stopCamera}
                      className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Privacy Notice */}
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                <h4 className="text-white font-medium mb-2">🔒 Privacy & Security</h4>
                <p className="text-gray-300 text-sm">
                  Your privacy is our priority. All mood analysis is performed locally on your device. 
                  No personal data, images, or audio recordings are stored or transmitted to our servers.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Current Mood Display */}
              {currentMoodData && (
                <div className={`${currentMoodData.color} rounded-lg p-6 text-white`}>
                  <div className="flex items-center gap-4 mb-4">
                    <currentMoodData.icon className="w-12 h-12" />
                    <div>
                      <h2 className="text-2xl font-bold">You're feeling {currentMoodData.name}</h2>
                      <p className="opacity-90">{currentMoodData.affirmation}</p>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <h3 className="font-semibold mb-2">💡 Wellness Tips</h3>
                      <ul className="space-y-1 text-sm opacity-90">
                        {currentMoodData.tips.map((tip, index) => (
                          <li key={index}>• {tip}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">🆘 Need Support?</h3>
                      <div className="text-sm opacity-90 space-y-1">
                        <p>Crisis Text Line: Text HOME to 741741</p>
                        <p>National Suicide Prevention: 988</p>
                        <p>Mental Health America: mhanational.org</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Recommendations */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-white">
                    Recommended for your mood
                  </h3>
                  <button
                    onClick={() => {
                      setSelectedMood(null);
                      setRecommendations([]);
                      setTextInput('');
                    }}
                    className="text-purple-400 hover:text-purple-300 text-sm"
                  >
                    Change mood
                  </button>
                </div>

                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                  </div>
                ) : recommendations.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {recommendations.map((movie) => (
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
                  <p className="text-gray-400 text-center py-8">
                    Loading personalized recommendations...
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};