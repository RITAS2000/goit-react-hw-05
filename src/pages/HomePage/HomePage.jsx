import { useEffect, useState } from 'react';
import { getPopularMovies } from '../../api.js';
import css from './HomePage.module.css';
import { Link, useLocation } from 'react-router-dom';

import MovieList from '../../components/MovieList/MovieList.jsx';
import { Toaster, toast } from 'react-hot-toast';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const location = useLocation();

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
      <ul className={css.container}>
        {movies.map((movie) => {
          return (
            <Link to={`/movies/${movie.id}`} state={{ from: location }}>
              <li className={css.movieItem} key={movie.id}>
                <MovieList
                  poster_path={movie.poster_path}
                  title={movie.title}
                  vote_average={movie.vote_average}
                  id={movie.id}
                />
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}
