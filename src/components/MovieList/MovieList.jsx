import css from './MovieList.module.css';
import { BsStarFill } from 'react-icons/bs';

export default function MovieList({ poster_path, title, vote_average }) {
  return (
    <div className={css.imgContainer}>
      <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title} />

      <div className={css.iconContainer}>
        <BsStarFill className={css.icon} />
        <p className={css.text}> {vote_average}</p>
      </div>
    </div>
  );
}
