import css from "./Contact.module.css";
import { IoPerson } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";

const ContactList = ({ contact: { id, name, number }, deleteContact }) => {
  const handleDelete = (idToDelete) => deleteContact(idToDelete);

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
      <button onClick={() => handleDelete(id)}>Delete</button>
    </div>
  );
};
export default ContactList;
