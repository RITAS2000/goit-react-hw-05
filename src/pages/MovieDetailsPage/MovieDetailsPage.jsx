import { getMovieById } from '../../api.js';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import css from './MovieDetailsPage.module.css';
import { format } from 'date-fns';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';
import { Toaster, toast } from 'react-hot-toast';
import NotFoundPage from '../NotFoundPage/NotFoundPage.jsx';

export default function MovieDetailsPage() {
  const { movieId } = useParams();

  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(false);

  const location = useLocation();

  useEffect(() => {
    getMovieById(movieId)
      .then((data) => {
        console.log('DATA FROM API', data);
        if (!data || !data.id) {
          setError(true);
          return;
        }
        setMovie(data);
      })
      .catch((error) => {
        toast.error(error.message || 'Something went wrong');
        setError(true);
      });
  }, [movieId]);

  if (error) {
    return <NotFoundPage />;
  }

  if (!movie) {
    return;
  }

  const year = format(new Date(movie.release_date), 'yyyy');
  const backLink = location.state?.from || '/movies';
  return (
    <>
      <div className={css.container}>
        <Toaster position="top-right" />
        <Link to={backLink} className={css.button}>
          <BsArrowLeft />
          Go back
        </Link>
        <div className={css.dubl}>
          <div className={css.imgContainer}>
            <img
              className={css.img}
              src={
                movie.backdrop_path
                  ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
                  : 'https://img.freepik.com/premium-photo/icon-red-cross-like-cancellation_438099-10817.jpg?semt=ais_hybrid&w=740'
              }
              alt={movie.title}
            />
          </div>
          <div>
            <h2 className={css.title}>
              {movie.title} ({year})
            </h2>
            <div className={css.textContainer}>
              <p className={css.text}>
                <span className={css.spanText}>Tagline:</span> {movie.tagline}
              </p>
              <p className={css.text}>
                <span className={css.spanText}>Overview:</span> {movie.overview}
              </p>
              <p className={css.text}>
                <span className={css.spanText}>Genres:</span>{' '}
                {movie.genres.map((genre) => genre.name).join(', ')}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={css.links}>
        <h3 className={css.title}>Additional information</h3>
        <div className={css.linksContiner}>
          <Link to="cast" className={css.link}>
            Cast
          </Link>
          <Link to="reviews" className={css.link}>
            Reviews
          </Link>
        </div>
      </div>
      <Outlet />
    </>
  );
}
