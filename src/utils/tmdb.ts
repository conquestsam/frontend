const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_API_KEY = '93a8f7981f30c6e181cbdcbb62a8e867';

export interface TMDBMovie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  runtime?: number;
  genres?: Array<{ id: number; name: string }>;
  credits?: {
    cast: Array<{
      id: number;
      name: string;
      character: string;
      profile_path: string;
    }>;
  };
  similar?: TMDBResponse;
  videos?: {
    results: Array<{
      id: string;
      key: string;
      name: string;
      site: string;
      type: string;
    }>;
  };
}

export interface TMDBResponse {
  results: TMDBMovie[];
  total_pages: number;
  total_results: number;
  page: number;
}

export interface TMDBGenre {
  id: number;
  name: string;
}

class TMDBService {
  private async makeRequest<T>(endpoint: string, params: Record<string, any> = {}): Promise<T> {
    const url = new URL(`${TMDB_BASE_URL}${endpoint}`);
    url.searchParams.append('api_key', TMDB_API_KEY);
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, value.toString());
      }
    });

    try {
      const response = await fetch(url.toString());
      
      if (!response.ok) {
        throw new Error(`TMDB API error: ${response.status} ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('TMDB API request failed:', error);
      throw error;
    }
  }

  async searchMovies(query: string, page: number = 1): Promise<TMDBResponse> {
    return this.makeRequest<TMDBResponse>('/search/movie', {
      query,
      page,
      include_adult: false
    });
  }

  async getPopularMovies(page: number = 1): Promise<TMDBResponse> {
    return this.makeRequest<TMDBResponse>('/movie/popular', { page });
  }

  async getTopRatedMovies(page: number = 1): Promise<TMDBResponse> {
    return this.makeRequest<TMDBResponse>('/movie/top_rated', { page });
  }

  async getTrendingMovies(timeWindow: 'day' | 'week' = 'week'): Promise<TMDBResponse> {
    return this.makeRequest<TMDBResponse>(`/trending/movie/${timeWindow}`);
  }

  async getUpcomingMovies(page: number = 1): Promise<TMDBResponse> {
    return this.makeRequest<TMDBResponse>('/movie/upcoming', { page });
  }

  async getMovieDetails(id: number): Promise<TMDBMovie> {
    const [movie, credits, similar, videos] = await Promise.all([
      this.makeRequest<TMDBMovie>(`/movie/${id}`),
      this.makeRequest<{ cast: any[] }>(`/movie/${id}/credits`),
      this.makeRequest<TMDBResponse>(`/movie/${id}/similar`),
      this.makeRequest<{ results: any[] }>(`/movie/${id}/videos`)
    ]);

    return {
      ...movie,
      credits,
      similar,
      videos
    };
  }

  async getSimilarMovies(id: number): Promise<TMDBResponse> {
    return this.makeRequest<TMDBResponse>(`/movie/${id}/similar`);
  }

  async getMoviesByGenre(genreId: number, page: number = 1): Promise<TMDBResponse> {
    return this.makeRequest<TMDBResponse>('/discover/movie', {
      with_genres: genreId,
      page,
      sort_by: 'popularity.desc'
    });
  }

  async getGenres(): Promise<{ genres: TMDBGenre[] }> {
    return this.makeRequest<{ genres: TMDBGenre[] }>('/genre/movie/list');
  }
}

export const tmdbService = new TMDBService();