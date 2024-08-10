import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

export default function MovieList({ movies, path = "" }) {
  const location = useLocation();
  return (
    <ul className={css.movieList}>
      {movies
        // to avoid inappropriate foreign language - add filter
        // .filter(
        //   (movie) =>
        //     movie.original_language === "en" || movie.original_language === "ua"
        // )
        .map((item) => (
          <li key={item.id} className={css.movieListItem}>
            <Link to={`${path}${item.id}`} state={location}>
              {item.title}
            </Link>{" "}
            ({item.release_date.slice(0, 4)})
          </li>
        ))}
    </ul>
  );
}
