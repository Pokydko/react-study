import { useState, useRef } from "react";
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
  const current_page = useRef(1);
  const userRequest = useRef("");

  const [picture, setPicture] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const onSubmit = (firstRequest = false, request) => {
    setLoading(true);
    setError(false);
    setIsThereMore(false);
    if (firstRequest) {
      setPhotos([]);
      current_page.current = 1;
      userRequest.current = request;
    } else {
      current_page.current += 1;
    }
    unsplashApi(userRequest.current, current_page.current, 30)
      .then(({ data }) => {
        if (firstRequest) setPhotos(data.results);
        else setPhotos(photos.concat(data.results));
        checkEmptyReply(data.results);
        if (data.total_pages > current_page.current) setIsThereMore(true);
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
  };

  const viewInModal = (e) => {
    setPicture(e);
    setModalIsOpen(true);
  };

  return (
    <>
      <SearchBar onSubmit={onSubmit} />
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
      {isThereMore && <LoadMoreBtn onSubmit={onSubmit} />}
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

// clickToBlackId("blackWhite");
function clickToBlackId(id) {
  const root = document.querySelector(":root");
  const changeTheme = () => {
    root.style.colorScheme =
      root.style.colorScheme === "dark" ? "light" : "dark";
    console.info("Change black/white theme (tap on Title)");
  };

  setTimeout(() => {
    document.getElementById(id).addEventListener("click", changeTheme);
  }, 500);

  return () => {
    setTimeout(() => {
      if (document.getElementById(id))
        document.getElementById(id).removeEventListener("click", changeTheme);
    }, 500);
  };
}
