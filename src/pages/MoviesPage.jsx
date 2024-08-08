import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar/SearchBar";
import MovieList from "../components/MovieList/MovieList";
import LoadMoreBtn from "../components/LoadMoreBtn/LoadMoreBtn";
import toast from "react-hot-toast";
import RingLoader from "react-spinners/RingLoader";
import tmdbApi from "../tmdb-api";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import ImageModal from "../components/ImageModal/ImageModal";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [isThereMore, setIsThereMore] = useState(false);
  const [userRequest, setUserRequest] = useState("");

  const [current_page, setCurrent_page] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    if (userRequest === "") return;
    setLoading(true);
    setError(false);
    setIsThereMore(false);

    tmdbApi({
      path: "search/movie",
      searchRequest: userRequest,
      page: current_page,
    })
      .then(({ data }) => {
        //
        console.dir(data.results);
        //
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
  }, [userRequest, current_page]);

  const onSearch = (userRequest) => {
    setMovies([]);
    setUserRequest(userRequest);
    setCurrent_page(1);
  };

  const onLoadMore = () => {
    setCurrent_page(current_page + 1);
  };

  return (
    <>
      <SearchBar onSearch={onSearch}></SearchBar>
      <MovieList movies={movies}></MovieList>
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
      <ImageModal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
        open covers in modal
      </ImageModal>
    </>
  );
};
export default Movies;

function checkEmptyReply(arr) {
  if (arr.length === 0) toast.error(<span>There&#39;s nothing to show</span>);
}
