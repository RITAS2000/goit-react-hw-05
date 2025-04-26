import { useEffect, useState } from 'react';
import { getMovieReviews } from '../../api.js';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import css from './MovieReviews.module.css';
import { Toaster, toast } from 'react-hot-toast';

export default function MovieReviews() {
  const [reviews, setReviews] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    getMovieReviews(movieId)
      .then((data) => {
        setReviews(data);
      })
      .catch((error) => {
        toast.error(error.message || 'Something went wrong');
      });
  }, [movieId]);
  if (!reviews) {
    return;
  }

  return (
    <div className={css.container}>
      <Toaster position="top-right" />
      <h2 className={css.title}>Reviews</h2>
      {reviews.length > 0 ? (
        <ul className={css.itemContainer}>
          {reviews.map((review) => {
            const time = format(new Date(review.created_at), 'PP');
            return (
              <li key={review.id} className={css.item}>
                <h4 className={css.text}>Author: {review.author}</h4>
                <p className={css.text}>{time}</p>
                <p className={css.text}>{review.content}</p>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className={css.noFound}>No review information available.</p>
      )}
    </div>
  );
}
