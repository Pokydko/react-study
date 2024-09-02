import css from "./ContactList.module.css";
import Contact from "../Contact/Contact";
// redux
import { useSelector } from "react-redux";
import { selectContacts, selectNameFilter } from "../../redux/selectors";

const getVisibleContacts = (contacts, nameFilter) => {
  return contacts.filter(
    ({ name, number }) =>
      name.toLowerCase().includes(nameFilter.toLowerCase()) ||
      number.includes(nameFilter)
  );
};

const ContactList = () => {
  const contacts = useSelector(selectContacts);
  const nameFilter = useSelector(selectNameFilter);

  const visibleContacts = getVisibleContacts(contacts, nameFilter);

  return (
    <ul className={css.list}>
      {visibleContacts.map((contact) => (
        <li className={css.listItem} key={contact.id}>
          <Contact contact={contact} />
        </li>
      ))}
    </ul>
  );
};
export default ContactList;
