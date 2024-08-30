import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import MoviesList from "../components/MoviesList/MoviesList";

import { fetchTrendingMovies } from "../fetchAPi";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const getAllMovies = async () => {
      try {
        const results = await fetchTrendingMovies();
        setMovies(results);
      } catch (error) {
        toast.error("Something went wrong. Sorry! You can try again later", {
          duration: 4000,
          position: "top-right",
        });
      }
    };
    getAllMovies();
  }, []);
  return (
    <div>
      <h1>Trending now</h1>
      <MoviesList movies={movies} />
      <Toaster />
    </div>
  );
};

export default HomePage;
