import { Link } from "react-router-dom";
import lookingFor from "../img/404.png";

const NotFound = () => {
  return (
    <div style={{ textAlign: "center", fontSize: 32 }}>
      <Link to="/">
        <img src={lookingFor} alt="" />
        There&#39;s nothing to show (click on actor to return home)
      </Link>
    </div>
  );
};
export default NotFound;
