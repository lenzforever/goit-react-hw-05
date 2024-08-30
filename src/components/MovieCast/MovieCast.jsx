import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import { fetchCast } from "../../fetchAPi";

import css from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState(null);

  useEffect(() => {
    const getCast = async () => {
      try {
        const data = await fetchCast(movieId);
        setCast(data.cast);
      } catch (error) {
        toast.error("Something went wrong. Sorry! You can try again later", {
          duration: 4000,
          position: "top-right",
        });
      }
    };
    getCast();
  }, []);

  return (
    <div>
      <h3 className={css.title}>Movie Cast</h3>
      <ul className={css.list}>
        {cast !== null &&
          cast.map((actor) => {
            return (
              <li key={actor.id} className={css.listItem}>
                <img
                  className={css.actorPhoto}
                  src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                  alt={`Photo of ${actor.name}`}
                />
                <h4>{actor.name}</h4>
                <p>Role: {actor.character}</p>
              </li>
            );
          })}
      </ul>
      <Toaster />
    </div>
  );
};

export default MovieCast;
