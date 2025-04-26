import Form from '../../components/Form/Form';
import { searchMovies } from '../../api.js';
import { useState, useEffect } from 'react';
import MovieList from '../../components/MovieList/MovieList.jsx';
import css from './MoviesPage.module.css';
import { useSearchParams } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import { FadeLoader } from 'react-spinners';

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);

  const [searchValue, setSearchValue] = useState();
  const [isSearched, setIsSearched] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const query = searchParams.get('query') || '';

  useEffect(() => {
    if (!query) return;
    setLoading(true);

    async function fetchMovies() {
      try {
        const results = await searchMovies(query);
        setMovies(results);
        setError(null);
      } catch (error) {
        toast.error(error.message || 'Something went wrong');
        setError(error.message || 'Something went wrong');
      } finally {
        setLoading(false);
        setIsSearched(true);
      }
    }

    fetchMovies();
  }, [query]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const trimmed = searchValue.trim();

    if (trimmed === '') {
      return;
    }

    setSearchParams({ query: trimmed });
    setSearchValue('');
  };
  return (
    <div>
      <Toaster position="top-right" />
      <Form
        value={searchValue}
        onSubmit={handleSubmit}
        onChange={(evt) => setSearchValue(evt.target.value)}
      />
      <div className={css.box}>
        {loading && (
          <div className={css.loaderContainer}>
            <FadeLoader color="rgb(212, 231, 35)" />
          </div>
        )}
        {error && (
          <p className={css.error}>
            <span className={css.errorText}>Error:</span> {error}
          </p>
        )}
        {!loading && movies.length > 0 ? (
          <MovieList movies={movies} />
        ) : !loading && isSearched ? (
          <p className={css.noFound}>No movies found</p>
        ) : null}
      </div>
    </div>
  );
}
