import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import MoviesList from "../components/MoviesList/MoviesList";
import { fetchMovies } from "../fetchAPi";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const userRequest = searchParams.get("query") ?? "";

  useEffect(() => {
    const fetchMoviesData = async () => {
      if (!userRequest) return;
      try {
        const data = await fetchMovies(userRequest);
        setMovies(data);
      } catch (error) {
        toast.error("Something went wrong. Please try again later.", {
          duration: 4000,
          position: "top-right",
        });
      }
    };

    fetchMoviesData();
  }, [userRequest]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchValue = e.target.userRequest.value.trim();
    setSearchParams(searchValue ? { query: searchValue } : {});
  };

  return (
    <div className="movies-page">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          name="userRequest"
          placeholder="Search for movies..."
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {movies.length > 0 && <MoviesList movies={movies} />}
      {movies.length === 0 && userRequest && (
        <p className="no-results">No movies found for "{userRequest}"</p>
      )}
      <Toaster />
    </div>
  );
};

export default MoviesPage;
