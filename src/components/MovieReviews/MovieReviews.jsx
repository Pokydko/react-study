import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import tmdbApi from "../../tmdb-api";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [items, setItems] = useState({});

  useEffect(() => {
    tmdbApi({
      path: `movie/${movieId}/reviews`,
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
    <ul
    // className={css.reviewUl}
    >
      {items.results?.length === 0 &&
        "We don't have any reviews for this movie"}

      {items.results?.map((item) => (
        <li key={item.id} style={{ fontSize: 12, marginBottom: 10 }}>
          <h3 style={{ fontSize: 14, marginTop: 10, marginBottom: 5 }}>
            {item.author}:
          </h3>
          <p>{item.content}</p>
        </li>
      ))}
    </ul>
  );
}
