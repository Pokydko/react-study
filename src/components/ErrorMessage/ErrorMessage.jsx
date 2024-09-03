import css from "./ErrorMessage.module.css";
import illustration from "./broken-phone.svg";

const ErrorMessage = ({ children }) => {
  return (
    <div className={css.message}>
      {children}
      <img src={illustration} alt="error on loading contacts" />
    </div>
  );
};
export default ErrorMessage;
