import { getMovieById } from '../../api.js';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import css from './MovieDetailsPage.module.css';
import { format } from 'date-fns';
import { Routes, Route } from 'react-router-dom';
import MovieReviews from '../../components/MovieReviews/MovieReviews.jsx';
import MovieCast from '../../components/MovieCast/MovieCast.jsx';
import { Link } from 'react-router-dom';

export default function MovieDetailsPage() {
  const { movieId } = useParams();

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    getMovieById(movieId).then((data) => setMovie(data));
  }, [movieId]);
  if (!movie) {
    return <p>Loading...</p>;
  }

  const year = format(new Date(movie.release_date), 'yyyy');

  return (
    <>
      <div className={css.container}>
        <img
          className={css.img}
          src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
          alt={movie.title}
        />
        <div>
          <h2 className={css.title}>
            {movie.title} ({year})
          </h2>
          <div className={css.textContainer}>
            <p>
              <span className={css.spanText}>Tagline:</span> {movie.tagline}
            </p>
            <p className={css.overview}>
              <span className={css.spanText}>Overview:</span> {movie.overview}
            </p>
            <p>
              <span className={css.spanText}>Genres:</span>{' '}
              {movie.genres.map((genre) => genre.name).join(', ')}
            </p>
          </div>
        </div>
      </div>
      <div className={css.links}>
        <Link to={`/movies/${movie.id}/cast`} className={css.link}>
          Cast
        </Link>
        <Link to={`/movies/${movie.id}/reviews`} className={css.link}>
          Reviews
        </Link>
      </div>
      <Routes>
        <Route path="cast" element={<MovieCast />} />
        <Route path="reviews" element={<MovieReviews />} />
      </Routes>
    </>
  );
}
