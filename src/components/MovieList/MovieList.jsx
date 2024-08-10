import css from "./MovieList.module.css";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import RingLoader from "react-spinners/RingLoader";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import tmdbApi from "../../tmdb-api";
import { useSearchParams } from "react-router-dom";

export default function MovieList({ requestPath = "", linkPath = "" }) {
  const [loading, setLoading] = useState(false);
  const [isThereMore, setIsThereMore] = useState(false);
  const [error, setError] = useState(false);
  const [movies, setMovies] = useState([]);
  const [current_page, setCurrent_page] = useState(1);
  const location = useLocation();
  const [userRequest, setUserRequest] = useState("");
  const [newUserRequest] = useSearchParams();

  useEffect(() => {
    setUserRequest(newUserRequest.get("query"));
    setCurrent_page(1);
    setMovies([]);
  }, [location]);

  useEffect(() => {
    if (requestPath.includes("search") && !userRequest) return;
    setLoading(true);
    setError(false);
    setIsThereMore(false);

    tmdbApi({
      path: requestPath,
      searchRequest: userRequest,
      page: current_page,
    })
      .then(({ data }) => {
        setMovies(movies.concat(data.results));
        checkEmptyReply(data.results);
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
  }, [current_page, userRequest]);

  const onLoadMore = () => {
    setCurrent_page(current_page + 1);
  };

  return (
    <>
      <ul className={css.movieList}>
        {movies
          // to avoid inappropriate foreign language - add filter
          // .filter(
          //   (movie) =>
          //     movie.original_language === "en" || movie.original_language === "ua"
          // )
          .map((item) => (
            <li key={item.id} className={css.movieListItem}>
              <Link to={`${linkPath}${item.id}`} state={location}>
                {item.title}
              </Link>{" "}
              ({item.release_date.slice(0, 4)})
            </li>
          ))}
      </ul>
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

function checkEmptyReply(arr) {
  if (arr.length === 0) toast.error(<span>There&#39;s nothing to show</span>);
}
