import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  
  register: (username: string, email: string, password: string) =>
    api.post('/auth/register', { username, email, password }),
  
  getCurrentUser: () => api.get('/auth/me'),
};

// Movies API
export const moviesAPI = {
  search: (query: string, page = 1) =>
    api.get(`/movies/search?query=${encodeURIComponent(query)}&page=${page}`),
  
  getPopular: (page = 1) =>
    api.get(`/movies/popular?page=${page}`),
  
  getTopRated: (page = 1) =>
    api.get(`/movies/top-rated?page=${page}`),
  
  getById: (id: number) =>
    api.get(`/movies/${id}`),
  
  getByGenre: (genreId: number, page = 1) =>
    api.get(`/movies/genre/${genreId}?page=${page}`),
  
  getGenres: () =>
    api.get('/movies/genres/list'),
};

// User API
export const userAPI = {
  addToFavorites: (movieId: number, title: string, posterPath: string) =>
    api.post('/users/favorites', { movieId, title, posterPath }),
  
  removeFromFavorites: (movieId: number) =>
    api.delete(`/users/favorites/${movieId}`),
  
  addToWatchlist: (movieId: number, title: string, posterPath: string) =>
    api.post('/users/watchlist', { movieId, title, posterPath }),
  
  removeFromWatchlist: (movieId: number) =>
    api.delete(`/users/watchlist/${movieId}`),
  
  rateMovie: (movieId: number, rating: number, review?: string) =>
    api.post('/users/rate', { movieId, rating, review }),
};

export default api;