import css from './MovieList.module.css';
import { BsStarFill } from 'react-icons/bs';
import { Link, useLocation } from 'react-router-dom';

export default function MovieList({ movies }) {
  const location = useLocation();

  return (
    <ul className={css.movieList}>
      {movies.map((movie) => {
        const posterUrl = movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : 'https://img.freepik.com/premium-photo/icon-red-cross-like-cancellation_438099-10817.jpg?semt=ais_hybrid&w=740';

        return (
          <li className={css.movieItem} key={movie.id}>
            <Link to={`/movies/${movie.id}`} state={{ from: location }}>
              <div className={css.imgContainer}>
                <img src={posterUrl} alt={movie.title} />

                <div className={css.iconContainer}>
                  <BsStarFill className={css.icon} />
                  <p className={css.text}>{movie.vote_average}</p>
                </div>
              </div>
              <h3 className={css.title}>{movie.title}</h3>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
