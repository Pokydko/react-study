import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import RingLoader from "react-spinners/RingLoader";
import css from "./App.module.css";
import unsplashApi from "./unsplash-my-api";

import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import ImageModal from "./components/ImageModal/ImageModal";

const App = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isThereMore, setIsThereMore] = useState(false);
  const [current_page, setCurrent_page] = useState(1);
  const [userRequest, setUserRequest] = useState("");

  const [picture, setPicture] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const changeTheme = () => {
      root.style.colorScheme =
        root.style.colorScheme === "dark" ? "light" : "dark";
      console.info("Change black/white theme (tap on Title)");
    };
    const root = document.querySelector(":root");
    root
      .querySelector(`.${css.colorSwitcherBtn}`)
      .addEventListener("click", changeTheme);

    return () => {
      if (root.querySelector(`.${css.colorSwitcherBtn}`))
        root
          .querySelector(`.${css.colorSwitcherBtn}`)
          .removeEventListener("click", changeTheme);
    };
  }, []);

  useEffect(() => {
    if (userRequest === "") return;
    setLoading(true);
    setError(false);
    setIsThereMore(false);

    unsplashApi({
      searchRequest: userRequest,
      searchPage: current_page,
      perPage: 30,
    })
      .then(({ data }) => {
        setPhotos(photos.concat(data.results));
        checkEmptyReply(data.results);
        if (data.total_pages > current_page) setIsThereMore(true);
        else
          toast.custom(
            <span className={`${css.toast} ${css.toastEnd}`}>
              🎸more, 🎸more... no more... of that jazz
            </span>
          );
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        setError(true);
      })
      .finally(() => {
        setTimeout(() => setLoading(false), 2000);
      });
  }, [userRequest, current_page]);

  const onSearch = (userRequest) => {
    setUserRequest(userRequest);
    setCurrent_page(1);
    setPhotos([]);
  };

  const onLoadMore = () => {
    setCurrent_page(current_page + 1);
  };

  const viewInModal = (e) => {
    setPicture(e);
    setModalIsOpen(true);
  };

  return (
    <>
      <div className={css.colorSwitcherBtn}></div>
      <SearchBar onSearch={onSearch} />
      {photos.length > 0 && (
        <ImageGallery photos={photos} viewInModal={viewInModal} />
      )}
      {error && (
        <ErrorMessage>
          Something went wrong.{" "}
          <a className={css.link} href="/">
            Reload the page
          </a>
          , please.
        </ErrorMessage>
      )}
      {isThereMore && <LoadMoreBtn onLoadMore={onLoadMore} />}
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
        {picture}
      </ImageModal>
    </>
  );
};
export default App;

function checkEmptyReply(arr) {
  if (arr.length === 0)
    toast.custom(
      <span className={css.toast}>
        🎸Empty spaces, what are we living for? ⌨️Empty replies, what are we
        looking for?
      </span>
    );
}
