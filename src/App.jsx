import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import ContactForm from "./components/ContactForm/ContactForm.jsx";
import SearchBox from "./components/SearchBox/SearchBox.jsx";
import ContactList from "./components/ContactList/ContactList.jsx";
import defaultBase from "./data/contacts.json";

const App = () => {
  const [contactsBase, setContactBase] = useState(
    fromLocalStorage("storageBase", defaultBase)
  );
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

  useEffect(() => clickToBlack("h1"), []);

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
      <h1 className="title">Phonebook</h1>
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

function fromLocalStorage(key, startingState) {
  try {
    const inStorage = JSON.parse(localStorage.getItem(key));
    if (inStorage && inStorage.length === 0) {
      console.info(
        "It seems you delete everything from Base. If you reload page with empty Base - it'll initialize by default"
      );
      return startingState;
    }
    return inStorage === null ? startingState : inStorage;
  } catch (error) {
    console.error(
      "Something went wrong with your browser storage, but we handle it."
    );
    return startingState;
  }
}

function clickToBlack(tag) {
  const root = document.querySelector(":root");
  const changeTheme = () => {
    root.style.colorScheme =
      root.style.colorScheme === "dark" ? "light" : "dark";
    console.info("Change black/white theme (tap on Title)");
  };

  setTimeout(() => {
    document.querySelector(tag).addEventListener("click", changeTheme);
  }, 500);

  return () => {
    setTimeout(() => {
      if (document.querySelector(tag))
        document.querySelector(tag).removeEventListener("click", changeTheme);
    }, 500);
  };
}
