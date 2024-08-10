import css from "./MovieDetailsPage.module.css";
import tmdbApi from "../tmdb-api";

import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useParams, useLocation } from "react-router-dom";

import ImageModal from "../components/ImageModal/ImageModal";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});

  const location = useLocation();
  const backLinkHref = location.state ?? "/movies";
  const [modalContent, setModalContent] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setModalContent({
      href: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
      description: movie.title,
    });
  };

  useEffect(() => {
    tmdbApi({
      path: `movie/${movieId}`,
    })
      .then(({ data }) => {
        setMovie(data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {});
  }, []);

  return (
    <>
      <Link to={backLinkHref} className={css.goBackLink}>
        ← Go back
      </Link>
      <div className={css.mainInfo}>
        <a className={css.linkPoster} href="#" onClick={handleClick}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={`poster of ${movie.title}`}
          />
        </a>
        <div className={css.textDetails}>
          <h2>
            {movie.title} ({movie.release_date?.slice(0, 4)})
          </h2>
          User score:{" "}
          <div className={css.content}>
            {Math.round(movie.vote_average * 10)}%
          </div>
          <h3>Overview</h3>
          {movie.overview}
          <h4>Genres</h4>
          <div className={css.content}>
            {movie.genres?.map((genre) => (
              <span key={genre.id} className={css.ganre}>
                {genre.name}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className={css.additionInfo}>
        <p>Additional information</p>
        <ul>
          <li>
            <Link to={`/movies/${movieId}/cast`}>Cast</Link>
          </li>
          <li>
            <Link to={`/movies/${movieId}/reviews`}>Reviews</Link>-{" "}
          </li>
        </ul>
      </div>
      <div className="bottomPart">
        <Outlet
          poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        ></Outlet>
      </div>

      <ImageModal
        isOpen={modalContent !== false}
        onClose={() => setModalContent(false)}
      >
        {modalContent}
      </ImageModal>
    </>
  );
}
