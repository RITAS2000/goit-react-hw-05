import css from './Header.module.css';
import Navigation from '../Navigation/Navigation.jsx';

export default function Header() {
  return (
    <header className={css.container}>
      <Navigation />
    </header>
  );
}
