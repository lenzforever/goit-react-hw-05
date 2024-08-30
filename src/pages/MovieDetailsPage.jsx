import { Link, useLocation } from "react-router-dom";
import { useRef } from "react";

import MovieCard from "../components/MovieCard/MovieCard";
import MovieInfo from "../components/MovieInfo/MovieInfo";

const MovieDetailsPage = () => {
  const location = useLocation();
  const backLink = useRef(location.state || "/movies");

  return (
    <div>
      <Link to={backLink.current}>
        <button type="button">Go Back</button>
      </Link>
      <MovieCard />
      <MovieInfo />
    </div>
  );
};

export default MovieDetailsPage;
