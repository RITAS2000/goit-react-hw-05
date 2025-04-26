import css from './MovieList.module.css';
import { BsStarFill } from 'react-icons/bs';

export default function MovieList({ poster_path, title, vote_average }) {
  const posterUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : 'https://img.freepik.com/premium-photo/icon-red-cross-like-cancellation_438099-10817.jpg?semt=ais_hybrid&w=740';

  return (
    <div className={css.imgContainer}>
      <img src={posterUrl} alt={title} />

      <div className={css.iconContainer}>
        <BsStarFill className={css.icon} />
        <p className={css.text}> {vote_average}</p>
      </div>
    </div>
  );
}
