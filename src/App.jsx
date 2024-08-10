import css from "./App.module.css";
import { Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import RingLoader from "react-spinners/RingLoader";

const Navigation = lazy(() => import("./components/Navigation/Navigation"));
const HomePage = lazy(() => import("./pages/HomePage"));
const MoviesPage = lazy(() => import("./pages/MoviesPage"));
const MovieDetailsPage = lazy(() => import("./pages/MovieDetailsPage"));
const MovieCast = lazy(() => import("./components/MovieCast/MovieCast"));
const MovieReviews = lazy(
  () => import("./components/MovieReviews/MovieReviews")
);
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

export default function App() {
  const location = useLocation();

  return (
    <>
      <header>
        <Navigation></Navigation>
      </header>
      <main>
        <Suspense
          fallback={
            <RingLoader
              color="#909080ff"
              size={40}
              aria-label="Loading Spinner"
              loading={true}
              cssOverride={{
                margin: "0 auto",
              }}
            />
          }
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route
              path="/movies/:movieId"
              state={location}
              element={<MovieDetailsPage />}
            >
              <Route path="cast" state={location} element={<MovieCast />} />
              <Route
                path="reviews"
                state={location}
                element={<MovieReviews />}
              />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      <footer>
        <div className={css.logo}></div>
      </footer>
    </>
  );
}
