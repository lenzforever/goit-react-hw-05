import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import { fetchCast } from "../../fetchAPi";
import css from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const getCast = async () => {
      try {
        const data = await fetchCast(movieId);
        setCast(data.cast || []); // Обрабатываем возможное отсутствие cast
      } catch (error) {
        toast.error("Something went wrong. Please try again later.", {
          duration: 4000,
          position: "top-right",
        });
      }
    };
    getCast();
  }, [movieId]); // Добавляем movieId в зависимости useEffect

  return (
    <div className={css.container}>
      <h3 className={css.title}>Movie Cast</h3>
      {cast.length === 0 ? (
        <p className={css.noCast}>No cast information available</p>
      ) : (
        <ul className={css.list}>
          {cast.map((actor) => (
            <li key={actor.id} className={css.listItem}>
              <img
                className={css.actorPhoto}
                src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                alt={`Photo of ${actor.name}`}
                onError={(e) => e.target.src = '/path/to/placeholder-image.jpg'} // Замена изображения по умолчанию
              />
              <h4 className={css.actorName}>{actor.name}</h4>
              <p className={css.actorRole}>Role: {actor.character}</p>
            </li>
          ))}
        </ul>
      )}
      <Toaster />
    </div>
  );
};

export default MovieCast;
