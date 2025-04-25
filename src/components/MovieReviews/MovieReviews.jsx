import { useEffect, useState } from 'react';
import { getMovieReviews } from '../../api.js';
import { useParams } from 'react-router-dom';

export default function MovieReviews() {
  const [reviews, setReviews] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    getMovieReviews(movieId).then(setReviews);
  }, [movieId]);
}
