import { useState, lazy } from "react";
import { useSearchParams } from "react-router-dom";

import SearchBar from "../components/SearchBar/SearchBar";
const MovieList = lazy(() => import("../components/MovieList/MovieList"));

const Movies = () => {
  const [userRequest, setUserRequest] = useSearchParams();

  const onSearch = (userRequest) => {
    setUserRequest({ query: userRequest });
  };

  return (
    <>
      <SearchBar onSearch={onSearch}></SearchBar>
      <MovieList
        requestPath="search/movie"
        // searchRequest={userRequest.get("query")}
      />
    </>
  );
};
export default Movies;
