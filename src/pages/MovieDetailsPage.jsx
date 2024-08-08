import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import css from "./MovieDetailsPage.module.css";
import tmdbApi from "../tmdb-api";

import MovieCast from "../components/MovieCast/MovieCast";
import MovieReviews from "../components/MovieReviews/MovieReviews";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    tmdbApi({
      path: `movie/${movieId}`,
    })
      .then(({ data }) => {
        //
        console.dir(data);
        //
        setMovie(data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {});
  }, []);

  return (
    <>
      <Link to="/movies"> ← Go back</Link>
      <div className={css.mainInfo}>
        <img src="" alt="" />
        <div className={css.textDetails}>
          <h2>
            {movie.title} ({new Date().getFullYear(movie.release_date)})
          </h2>
          User score: {Math.round(movie.vote_average * 10)}%<h3>Overview</h3>
          {movie.overview}
          <h4>Genres</h4>
          {/* {movie && movie.genres.reduce((acc, current) => {
            acc += current.name + ", ";
          }, "")} */}
          {/* {movie && movie.genres.join(", ")} */}
        </div>
      </div>
      <div className={css.additionInfo}>
        <p>Additional information</p>
        <ul>
          <li>
            cast - <MovieCast></MovieCast>
          </li>
          <li>
            MovieReviews - <MovieReviews></MovieReviews>
          </li>
        </ul>
      </div>
    </>
  );
}
