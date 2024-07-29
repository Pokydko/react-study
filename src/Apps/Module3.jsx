import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import css from './Module3.module.css';
import ContactForm from '../components/ContactForm/ContactForm.jsx';
import SearchBox from '../components/SearchBox/SearchBox.jsx';
import ContactList from '../components/ContactList/ContactList.jsx';
import defaultBase from '../data/contacts.json';

const App = () => {
  const [contactsBase, setContactBase] = useState(initializeBase());
  const [visibleContacts, setVisibleContacts] = useState(contactsBase);
  const [searchRequest, setSearchRequest] = useState('');

  useEffect(() => {
    localStorage.setItem('storageBase', JSON.stringify(contactsBase));
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

  useEffect(() => {
    const root = document.querySelector(':root');
    const changeTheme = () => {
      root.style.colorScheme =
        root.style.colorScheme === 'dark' ? 'light' : 'dark';
      console.info('Change black/white theme by tapping PhonebookTitle');
    };

    setTimeout(() => {
      document
        .getElementById('PhonebookTitle')
        .addEventListener('click', changeTheme);
    }, 1);

    return () => {
      setTimeout(() => {
        console.log('removeEventListener from PhonebookTitle');
        document
          .getElementById('PhonebookTitle')
          .removeEventListener('click', changeTheme);
      }, 500);
    };
  }, []);

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
    <div className={css.feedbakApp}>
      <h2 className={css.title} id='PhonebookTitle'>
        Phonebook
      </h2>
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
    const storageBase = JSON.parse(localStorage.getItem('storageBase'));
    if (storageBase && storageBase.length === 0) {
      console.info(
        "It seems you delete everything from Base. If you reload page with empty Base - it'll initialize by default"
      );
      return defaultBase;
    }
    return storageBase ?? defaultBase;
  } catch (error) {
    console.info('localStorage error, initialization from default Base');
    return defaultBase;
  }
}
