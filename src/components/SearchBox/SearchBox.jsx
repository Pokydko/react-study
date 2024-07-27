import css from "./SearchBox.module.css";
import { nanoid } from "nanoid";

const SearchBox = ({ setSearchRequest }) => {
  const handleOnChange = (userSearchEvent) => {
    setSearchRequest(userSearchEvent.target.value);
  };
  const searchBox = nanoid();

  return (
    <label htmlFor={searchBox}>
      Find contacts by name/number
      <input
        name="searchBox"
        type="text"
        onChange={handleOnChange}
        id={searchBox}
        className={css.searchBox}
      />
    </label>
  );
};
export default SearchBox;
