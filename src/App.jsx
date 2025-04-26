import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import { Routes, Route } from 'react-router-dom';
import css from './App.module.css';
import { Suspense, lazy } from 'react';
import { FadeLoader } from 'react-spinners';

const HomePage = lazy(() => import('./pages/HomePage/HomePage.jsx'));
const MovieDetailsPage = lazy(() =>
  import('./pages/MovieDetailsPage/MovieDetailsPage.jsx'),
);
const MovieCast = lazy(() => import('./components/MovieCast/MovieCast.jsx'));
const MovieReviews = lazy(() =>
  import('./components/MovieReviews/MovieReviews.jsx'),
);
const NotFoundPage = lazy(() =>
  import('./pages/NotFoundPage/NotFoundPage.jsx'),
);
const MoviesPage = lazy(() => import('./pages/MoviesPage/MoviesPage.jsx'));

export default function App() {
  return (
    <div className={css.app}>
      <Header />
      <main className={css.main}>
        <Suspense
          fallback={
            <div className={css.loaderContainer}>
              <FadeLoader color="rgb(212, 231, 35)" />
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
              <Route path="cast" element={<MovieCast />} />
              <Route path="reviews" element={<MovieReviews />} />
            </Route>
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
