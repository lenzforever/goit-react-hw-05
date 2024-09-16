import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import MoviesList from "../components/MoviesList/MoviesList";
import { fetchTrendingMovies } from "../fetchAPi";

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const results = await fetchTrendingMovies();
        setMovies(results);
      } catch (error) {
        toast.error("Something went wrong. Please try again later.", {
          duration: 4000,
          position: "top-right",
        });
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="home-page">
      <h1 className="title">Trending Now</h1>
      <MoviesList movies={movies} />
      <Toaster />
    </div>
  );
};

export default HomePage;
