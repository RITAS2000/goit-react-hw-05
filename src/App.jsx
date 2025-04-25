import Header from './components/Header/Header.jsx';
import HomePage from './pages/HomePage/HomePage.jsx';
import Footer from './components/Footer/Footer.jsx';
import { Routes, Route } from 'react-router-dom';
import MovieDetailsPage from './pages/MovieDetailsPage/MovieDetailsPage.jsx';
import css from './App.module.css';

export default function App() {
  return (
    <div className={css.app}>
      <Header />
      <main className={css.main}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies/:movieId/*" element={<MovieDetailsPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
