import { useEffect, useState } from "react";
import MovieList from "../components/MovieList/MovieList";

export default function Home() {
  // useEffect(() => {
  // }, []);

  return (
    <>
      <h2>Tranding today</h2>
      <MovieList requestPath="trending/movie/day" linkPath={"movies/"} />
    </>
  );
}
