import { getMovieCast } from '../../api.js';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import css from './MovieCast.module.css';

export default function MovieCast() {
  const [actors, setActors] = useState([]);
  const [loading, setLoading] = useState(true);
  const { movieId } = useParams();
  useEffect(() => {
    setLoading(true);
    getMovieCast(movieId)
      .then((data) => {
        setActors(data.cast); // Зберігаємо масив акторів
      })
      .catch((error) => console.error('Error fetching cast:', error))
      .finally(() => {
        setLoading(false); // Після завершення запиту, зупиняємо індикатор завантаження
      });
  }, [movieId]);

  if (loading) {
    return <p>Loading cast...</p>; // Показуємо "Loading" якщо дані ще завантажуються
  }

  if (!actors) {
    return <p>No cast data available.</p>; // Якщо actors = null, показуємо іншу помилку
  }
  return (
    <div className={css.castContainer}>
      <h2>Cast</h2>
      <div className={css.castList}>
        {actors.map((actor) => (
          <div key={actor.cast_id} className={css.actorCard}>
            <img
              src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
              alt={actor.name}
              className={css.actorImage}
            />
            <h3 className={css.actorName}>{actor.name}</h3>
            <p className={css.characterName}>Character: {actor.character}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
