import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import MoviesList from "../components/MoviesList/MoviesList";

import { fetchMovies } from "../fetchAPi";

const MoviesPage = () => {
  const [movies, setMovies] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const userRequest = searchParams.get("query") ?? "";

  useEffect(() => {
    const getMovies = async () => {
      if (!userRequest) return;
      try {
        const data = await fetchMovies(userRequest);
        setMovies(data);
      } catch (error) {
        toast.error("Something went wrong. Sorry! You can try again later", {
          duration: 4000,
          position: "top-right",
        });
      }
    };
    getMovies();
  }, [userRequest]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const searchValue = e.target.userRequest.value.trim();
    const params = searchValue !== "" ? { query: searchValue } : {};
    setSearchParams(params);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="userRequest" />
        <button type="submit">Search</button>
      </form>

      {movies !== null && <MoviesList movies={movies} />}
      <Toaster />
    </div>
  );
};

export default MoviesPage;
