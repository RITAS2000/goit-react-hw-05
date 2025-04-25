import { useEffect, useState } from 'react';
import { getPopularMovies } from '../../api.js';
import css from './HomePage.module.css';
import { Link } from 'react-router-dom';
import MovieList from '../../components/MovieList/MovieList.jsx';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    getPopularMovies()
      .then((data) => {
        setMovies(data.results);
      })
      .catch((error) => {
        console.error('Помилка при отриманні даних:', error);
      });
  }, []);

  return (
    <ul className={css.container}>
      {movies.map((movie) => {
        return (
          <li className={css.movieItem} key={movie.id}>
            <Link to={`/movies/${movie.id}`}>
              <MovieList
                poster_path={movie.poster_path}
                title={movie.title}
                vote_average={movie.vote_average}
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
