import { useEffect, useState } from "react";
import MovieList from "../components/MovieList/MovieList";
import LoadMoreBtn from "../components/LoadMoreBtn/LoadMoreBtn";
import RingLoader from "react-spinners/RingLoader";
import tmdbApi from "../tmdb-api";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [isThereMore, setIsThereMore] = useState(false);

  const [current_page, setCurrent_page] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    setIsThereMore(false);

    tmdbApi({
      path: "trending/movie/day",
      page: current_page,
    })
      .then(({ data }) => {
        setMovies(movies.concat(data.results));
        if (data.total_pages > current_page) setIsThereMore(true);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [current_page]);

  const onLoadMore = () => {
    setCurrent_page(current_page + 1);
  };

  return (
    <>
      <h2>Tranding today</h2>
      <MovieList movies={movies} path="movies\"></MovieList>
      {isThereMore && <LoadMoreBtn onLoadMore={onLoadMore} />}
      {error && (
        <ErrorMessage>
          <a href="/">Something went wrong. Click here to reload the page.</a>
        </ErrorMessage>
      )}
      <RingLoader
        color="#909080ff"
        size={40}
        aria-label="Loading Spinner"
        loading={loading}
        cssOverride={{
          margin: "0 auto",
        }}
      />
    </>
  );
}
