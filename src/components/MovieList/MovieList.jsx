import { Link } from "react-router-dom";
import css from "./MovieList.module.css";

export default function MovieList({ movies, path = "" }) {
  console.dir(movies[0]);
  return (
    <ul className={css.movieList}>
      {movies
        // .filter(
        //   (movie) =>
        //     movie.original_language === "en" || movie.original_language === "ua"
        // )
        .map((item) => (
          <li key={item.id} className={css.movieListItem}>
            <Link to={`${path}${item.id}`}>{item.title}</Link>
          </li>
        ))}
    </ul>
  );
}
