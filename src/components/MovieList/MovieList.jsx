import css from './MovieList.module.css';
import { BsStarFill } from 'react-icons/bs';
import { Link, useLocation } from 'react-router-dom';

export default function MovieList({ poster_path, title, vote_average, id }) {
  const posterUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : 'https://img.freepik.com/premium-photo/icon-red-cross-like-cancellation_438099-10817.jpg?semt=ais_hybrid&w=740';
  const location = useLocation();

  return (
    <div>
      <Link to={`/movies/${id}`} state={{ from: location }}>
        <div className={css.imgContainer}>
          <img src={posterUrl} alt={title} />

          <div className={css.iconContainer}>
            <BsStarFill className={css.icon} />
            <p className={css.text}> {vote_average}</p>
          </div>
        </div>
        <h3 className={css.title}>{title}</h3>
      </Link>
    </div>
  );
}
