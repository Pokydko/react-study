import { useEffect } from "react";
import "./ContactsPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import DocumentTitle from "../../components/DocumentTitle";
import ContactList from "../../components/ContactList/ContactList.jsx";
import ContactForm from "../../components/ContactForm/ContactForm.jsx";
import SearchBox from "../../components/SearchBox/SearchBox.jsx";
import { fetchContacts } from "../../redux/contacts/operations";
import {
  selectIsLoading,
  selectError,
} from "../../redux/contacts/selectors.js";
import { MutatingDots } from "react-loader-spinner";
import ErrorMsg from "../../components/ErrorMessage/ErrorMessage.jsx";

export default function ContactsPage() {
  let loading = useSelector(selectIsLoading);
  let error = useSelector(selectError);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div>
      <DocumentTitle>Phonebook</DocumentTitle>
      <ContactForm />
      <SearchBox />
      {loading && (
        <MutatingDots
          visible={true}
          height="100"
          width="100"
          color="#4fa94d"
          secondaryColor="#4fa94d"
          radius="12.5"
          ariaLabel="mutating-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      )}
      {error && <ErrorMsg>Something went wrong. </ErrorMsg>}
      <ContactList />
    </div>
  );
}
