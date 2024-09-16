import { Link, Outlet } from "react-router-dom";
import css from "./MovieInfo.module.css";

const MovieInfo = () => {
  return (
    <div className={css.wrapper}>
      <h3 className={css.title}>Additional Information</h3>
      <ul className={css.list}>
        <li className={css.item}>
          <Link to="cast" className={css.link}>Cast</Link>
        </li>
        <li className={css.item}>
          <Link to="reviews" className={css.link}>Reviews</Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
};

export default MovieInfo;
