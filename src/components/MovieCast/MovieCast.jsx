import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import actor from "../../img/actor.jpg";
import tmdbApi from "../../tmdb-api";
import css from "./MovieCast.module.css";

export default function MovieCast() {
  const { movieId } = useParams();
  const [items, setItems] = useState({});

  useEffect(() => {
    tmdbApi({
      path: `movie/${movieId}/credits`,
    })
      .then(({ data }) => {
        setItems(data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {});
  }, []);

  return (
    <ul className={css.castUl}>
      {items.cast?.map((item) => (
        <li key={item.id} className={css.castItem}>
          <img
            src={
              item.profile_path
                ? `https://image.tmdb.org/t/p/w200${item.profile_path}`
                : actor
            }
            alt={item.name}
          />
          <div className={css.aboutActor}>
            <h3>{item.name}</h3>
            Character: {item.character}
          </div>
        </li>
      ))}
    </ul>
  );
}
