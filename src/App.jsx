import css from "./App.module.css";
import { Routes, Route } from "react-router-dom";

import Navigation from "./components/Navigation/Navigation";
import HomePage from "./pages/HomePage";
import MoviesPage from "./pages/MoviesPage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <>
      <header>
        <Navigation></Navigation>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<NotFoundPage />} />
            <Route path="reviews" element={<NotFoundPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <footer>
        <div className={css.logo}></div>
      </footer>
    </>
  );
}
