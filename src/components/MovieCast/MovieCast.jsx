import { getMovieCast } from '../../api.js';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import css from './MovieCast.module.css';
import { Toaster, toast } from 'react-hot-toast';

export default function MovieCast() {
  const [actors, setActors] = useState([]);
  const { movieId } = useParams();
  useEffect(() => {
    getMovieCast(movieId)
      .then((data) => {
        setActors(data);
      })
      .catch((error) => {
        toast.error(error.message || 'Something went wrong');
      });
  }, [movieId]);

  if (!actors) {
    return;
  }

  return (
    <div className={css.castContainer}>
      <Toaster position="top-right" />
      <h2 className={css.title}>Cast</h2>
      {actors.length > 0 ? (
        <ul className={css.castList}>
          {actors.map((actor) => (
            <li key={actor.cast_id} className={css.actorCard}>
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                    : 'https://st5.depositphotos.com/87603620/75093/i/380/depositphotos_750936432-stock-photo-human-figure-sign-icon-human.jpg'
                }
                alt={actor.name}
                className={css.actorImage}
              />
              <h3 className={css.actorName}>{actor.name}</h3>
              <p className={css.characterName}>Character: {actor.character}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className={css.noFound}>No cast information available.</p>
      )}
    </div>
  );
}
