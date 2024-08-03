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
    <header>
      <form onSubmit={handleSubmit}>
        <input
          name="userInput"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button className={css.searchBtn} type="submit">
          <RxMagnifyingGlass />
        </button>
        <Toaster />
      </form>
    </header>
  );
};
export default SearchBar;
