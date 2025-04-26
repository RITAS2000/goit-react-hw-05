import { useEffect, useState } from 'react';
import { getPopularMovies } from '../../api.js';
import css from './HomePage.module.css';
import MovieList from '../../components/MovieList/MovieList.jsx';
import { Toaster, toast } from 'react-hot-toast';

export default function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getPopularMovies()
      .then((data) => {
        setMovies(data.results);
      })
      .catch((error) => {
        toast.error(error.message || 'Something went wrong');
      });
  }, []);

  return (
    <div className={css.box}>
      <Toaster position="top-right" />
      <h1 className={css.title}>Trending today</h1>
      <MovieList movies={movies} />
    </div>
  );
}
