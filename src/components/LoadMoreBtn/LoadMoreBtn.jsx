import css from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ onSubmit }) => {
  return (
    <button className={css.loadBtn} onClick={() => onSubmit(false)}>
      Load more
    </button>
  );
};
export default LoadMoreBtn;
