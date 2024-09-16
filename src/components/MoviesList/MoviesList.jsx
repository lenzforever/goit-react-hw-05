import { Link, useLocation } from "react-router-dom";
import css from "./MoviesList.module.css";

const MoviesList = ({ movies }) => {
  const location = useLocation();

  return (
    <ul className={css.list}>
      {movies.map((movie) => (
        <li key={movie.id} className={css.listItem}>
          <Link to={`/movies/${movie.id}`} state={{ from: location }} className={css.link}>
            <p className={css.title}>{movie.title}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MoviesList;
