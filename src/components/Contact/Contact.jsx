import css from "./Contact.module.css";
import { IoPerson } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
// redux
import { deleteContact } from "../../redux/contactsOps";
import { useDispatch } from "react-redux";

const Contact = ({ contact: { id, name, number } }) => {
  const dispatch = useDispatch();

  return (
    <div className={css.contact}>
      <div>
        <span className={css.name}>
          <IoPerson />
          {name}
        </span>
        <span className={css.number}>
          <FaPhoneAlt /> {number}
        </span>
      </div>
      <button onClick={() => dispatch(deleteContact(id))}>Delete</button>
    </div>
  );
};
export default Contact;
