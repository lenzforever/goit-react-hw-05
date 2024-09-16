import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import { fetchMovieDetails } from "../../fetchAPi";
import css from "./MovieCard.module.css";

const MovieCard = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState({});
  const releaseDate = new Date(movieDetails.release_date);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const data = await fetchMovieDetails(movieId);
        setMovieDetails(data);
      } catch (err) {
        toast.error("Something went wrong. Please try again later.", {
          duration: 4000,
          position: "top-right",
        });
      }
    };
    getMovieDetails();
  }, [movieId]);

  return (
    <div className={css.wrapper}>
      <img
        className={css.image}
        src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
        alt={movieDetails.original_title}
        onError={(e) => e.target.src = '/path/to/placeholder-image.jpg'} // Замена изображения по умолчанию
      />
      <div className={css.textWrapper}>
        <h2 className={css.title}>
          {movieDetails.title} ({releaseDate.getFullYear()})
        </h2>
        <p className={css.score}>User Score: {Math.round(movieDetails.vote_average * 10)}%</p>
        <h3 className={css.subtitle}>Overview</h3>
        <p className={css.overview}>{movieDetails.overview}</p>
        <h3 className={css.subtitle}>Genres</h3>
        <ul className={css.genreList}>
          {movieDetails.genres &&
            movieDetails.genres.map((genre) => (
              <li key={genre.id} className={css.genreItem}>{genre.name}</li>
            ))}
        </ul>
      </div>
      <Toaster />
    </div>
  );
};

export default MovieCard;
