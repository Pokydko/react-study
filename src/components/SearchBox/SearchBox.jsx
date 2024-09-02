import css from "./SearchBox.module.css";
// redux
import { changeFilter } from "../../redux/filtersSlice";
import { useDispatch } from "react-redux";

const SearchBox = () => {
  const dispatch = useDispatch();

  const handleOnSearch = (userSearchEvent) => {
    dispatch(changeFilter(userSearchEvent.target.value));
  };

  return (
    <label htmlFor="searchBox">
      Find contacts by name/number
      <input
        name="searchBox"
        id="searchBox"
        type="text"
        onChange={handleOnSearch}
        className={css.searchBox}
      />
    </label>
  );
};
export default SearchBox;
