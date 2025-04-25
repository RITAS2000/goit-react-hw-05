import axios from 'axios';

// const apiKey = import.meta.env.VITE_API_KEY;
const apiToken = import.meta.env.VITE_API_TOKEN;

const BASE_URL_1 =
  'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
const BASE_URL_2 = 'https://api.themoviedb.org/3/movie/';
const options = {
  headers: {
    Authorization: `Bearer ${apiToken}`,
    Accept: 'application/json',
  },
};
export async function getPopularMovies() {
  const response = await axios.get(BASE_URL_1, options);
  return response.data;
}

export async function getMovieById(movie_id) {
  const response = await axios.get(
    `${BASE_URL_2}${movie_id}?language=en-US`,
    options,
  );
  return response.data;
}

export async function getMovieCast(movie_id) {
  const response = await axios.get(
    `${BASE_URL_2}${movie_id}/credits?language=en-US`,
    options,
  );

  console.log('🚀 ~ getMovieCast ~ response:', response.data.cast);
  return response.data.cast;
}

export async function getMovieReviews(movie_id) {
  const response = await axios.get(
    `${BASE_URL_2}${movie_id}/reviews?language=en-US&page=1`,
    options,
  );
  return response.data.results;
}
