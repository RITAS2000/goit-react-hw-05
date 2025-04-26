import css from './Form.module.css';

export default function Form({ value, onSubmit, onChange }) {
  return (
    <div className={css.container}>
      <form onSubmit={onSubmit} className={css.form}>
        <div className={css.inputWrapper}>
          <input
            className={css.input}
            type="text"
            autoComplete="off"
            placeholder="Search movie"
            value={value}
            onChange={onChange}
          />
        </div>
        <button type="submit" className={css.button}>
          Search
        </button>
      </form>
    </div>
  );
}
