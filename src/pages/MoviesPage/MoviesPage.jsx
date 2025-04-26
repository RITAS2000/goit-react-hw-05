import Form from '../../components/Form/Form';
import { searchMovies } from '../../api.js';
import { useState, useEffect } from 'react';
import MovieList from '../../components/MovieList/MovieList.jsx';
import css from './MoviesPage.module.css';
import { Link } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';

export default function MoviesPage() {
  const [movies, setMovies] = useState([]); // Стан для збереження результатів
  const [query, setQuery] = useState('');
  const [searchValue, setSearchValue] = useState();
  const [isSearched, setIsSearched] = useState(false);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const results = await searchMovies(query);
        console.log('Results from API:', results);
        setMovies(results);
      } catch (error) {
        toast.error(error.message || 'Something went wrong');
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

    setQuery(trimmed);
    setIsSearched(true);
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
        <ul className={css.container}>
          {movies.length > 0 ? (
            movies.map((movie) => (
              <li className={css.movieItem} key={movie.id}>
                <Link to={`/movies/${movie.id}`}>
                  <MovieList
                    poster_path={movie.poster_path}
                    title={movie.title}
                    vote_average={movie.vote_average}
                  />
                </Link>
              </li>
            ))
          ) : isSearched ? (
            <p className={css.noFound}>No movies found</p>
          ) : null}
        </ul>
      </div>
    </div>
  );
}
