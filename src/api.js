import axios from 'axios';

// const apiKey = import.meta.env.VITE_API_KEY;
const apiToken = import.meta.env.VITE_API_TOKEN;

const BASE_URL_1 =
  'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
const BASE_URL_2 = 'https://api.themoviedb.org/3/movie/';
const BASE_URL_3 =
  'https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1';

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
  return response.data.cast;
}

export async function getMovieReviews(movie_id) {
  const response = await axios.get(
    `${BASE_URL_2}${movie_id}/reviews?language=en-US&page=1`,
    options,
  );
  return response.data.results;
}

export async function searchMovies(query) {
  const response = await axios.get(`${BASE_URL_3}&query=${query}`, options);
  return response.data.results;
}
