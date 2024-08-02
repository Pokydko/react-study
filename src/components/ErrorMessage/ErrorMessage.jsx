import css from "./ErrorMessage.module.css";

const ErrorMessage = ({ children }) => {
  return <div className={css.message}>{children}</div>;
};
export default ErrorMessage;
