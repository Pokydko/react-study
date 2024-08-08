import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./HomePage";

const NotFound = () => {
  return (
    <div>
      <Link to="/">
        There&#39;s nothing to show (click here to return home)
      </Link>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
};
export default NotFound;
