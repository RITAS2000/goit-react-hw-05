import css from './Navigation.module.css';
import { Link } from 'react-router-dom';

export default function Navigation() {
  return (
    <nav className={css.navContainer}>
      <Link className={css.headerText} to="/">
        Home
      </Link>
      <Link className={css.headerText} to="/movies">
        Movies
      </Link>
    </nav>
  );
}
