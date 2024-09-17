import { Link, useLocation, useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

import MovieCard from "../components/MovieCard/MovieCard";
import MovieInfo from "../components/MovieInfo/MovieInfo";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const backLink = useRef(location.state?.from || "/movies");

  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      setError('');

      try {
        const mockMovieDetails = {
          id: movieId,
          title: "Example Movie",
          description: "This is a mock description of the movie.",
          director: "John Doe",
          releaseDate: "2023-01-01",
          rating: 8.5
        };
        setTimeout(() => {
          setMovieDetails(mockMovieDetails);
          setLoading(false);
        }, 1000); 
      } catch (err) {
        setError('Не удалось загрузить данные фильма');
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  return (
    <div className="movie-details-page">
      <Link to={backLink.current}>
        <button type="button" className="back-button">
          Назад
        </button>
      </Link>

      {loading && <div>Загрузка...</div>}
      {error && <div>Ошибка: {error}</div>}

      {movieDetails && (
        <>
          <MovieCard movie={movieDetails} />
          <MovieInfo movie={movieDetails} />
        </>
      )}
    </div>
  );
};

export default MovieDetailsPage;
  