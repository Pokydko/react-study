import css from "./ContactList.module.css";
import Contact from "../Contact/Contact";

const ContactList = ({ visibleContacts, deleteContact }) => {
  return (
    <ul className={css.list}>
      {visibleContacts.map((contact) => (
        <li className={css.listItem} key={contact.id}>
          <Contact contact={contact} deleteContact={deleteContact} />
        </li>
      ))}
    </ul>
  );
};
export default ContactList;
