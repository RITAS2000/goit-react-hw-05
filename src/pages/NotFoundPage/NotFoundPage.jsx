import css from './NotFoundPage.module.css';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className={css.container}>
      <h2 className={css.title}>
        <span className={css.span}>Oops!</span> This page doesn't exist.
      </h2>
      <p className={css.text}>
        You might have landed here by mistake. Go back to the{' '}
        <Link to="/" className={css.link}>
          homepage
        </Link>
        .
      </p>
    </div>
  );
}
