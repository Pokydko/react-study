import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import ContactForm from "./components/ContactForm/ContactForm.jsx";
import SearchBox from "./components/SearchBox/SearchBox.jsx";
import ContactList from "./components/ContactList/ContactList.jsx";
import defaultBase from "./Data/contacts.json";

const App = () => {
  const [contactsBase, setContactBase] = useState(initializeBase());
  const [visibleContacts, setVisibleContacts] = useState(contactsBase);
  const [searchRequest, setSearchRequest] = useState("");

  useEffect(() => {
    localStorage.setItem("storageBase", JSON.stringify(contactsBase));
  }, [contactsBase]);

  useEffect(() => {
    setVisibleContacts(
      contactsBase.filter(
        ({ name, number }) =>
          name.toLowerCase().includes(searchRequest.toLowerCase()) ||
          number.includes(searchRequest)
      )
    );
  }, [searchRequest, contactsBase]);

  const addContact = (newContact) => {
    newContact.id = nanoid();
    setContactBase((currentBase) => [...currentBase, newContact]);
  };

  const deleteContact = (deletedId) => {
    setContactBase((currentBase) =>
      currentBase.filter(({ id }) => id !== deletedId)
    );
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} />
      <SearchBox setSearchRequest={setSearchRequest} />
      <ContactList
        visibleContacts={visibleContacts}
        deleteContact={deleteContact}
      />
    </div>
  );
};

export default App;

function initializeBase() {
  try {
    const storageBase = JSON.parse(localStorage.getItem("storageBase"));
    if (storageBase && storageBase.length === 0) {
      console.info(
        "It seems you delete everything from Base. If you reload page with empty Base - it'll initialize by default"
      );
      return defaultBase;
    }
    return storageBase ?? defaultBase;
  } catch (error) {
    console.info("localStorage error, initialization from default Base");
    return defaultBase;
  }
}

setTimeout(() => {
  const root = document.querySelector(":root");
  document.querySelector("h1").addEventListener("click", () => {
    root.style.colorScheme =
      root.style.colorScheme === "light dark" ? "light" : "light dark";

    console.log("click");
  });
}, 500);
