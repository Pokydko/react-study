import css from "./SearchBar.module.css";
import toast, { Toaster } from "react-hot-toast";
import { RxMagnifyingGlass } from "react-icons/rx";

const SearchBar = ({ onSearch }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target.userInput.value.trim() === "") {
      toast.custom(
        <span className={css.toast}>
          ☝️search field shouldn&apos;t be empty
        </span>
      );
      return;
    }
    onSearch(e.target.userInput.value);
  };
  return (
    <div className={css.formWrap}>
      <form onSubmit={handleSubmit}>
        <input
          name="userInput"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
        />
        <button className={css.searchBtn} type="submit">
          <RxMagnifyingGlass />
        </button>
        <Toaster />
      </form>
    </div>
  );
};
export default SearchBar;
