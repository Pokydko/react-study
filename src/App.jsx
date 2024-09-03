import { useEffect } from "react";
import "./App.css";
import ContactForm from "./components/ContactForm/ContactForm.jsx";
import SearchBox from "./components/SearchBox/SearchBox.jsx";
import ContactList from "./components/ContactList/ContactList.jsx";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts } from "./redux/contactsOps.js";
import { selectIsLoading, selectError } from "./redux/selectors.js";
import { MutatingDots } from "react-loader-spinner";
import ErrorMsg from "./components/ErrorMessage/ErrorMessage.jsx";
const App = () => {
  useEffect(() => clickToBlack("h1"), []);
  let loading = useSelector(selectIsLoading);
  let error = useSelector(selectError);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div>
      <h1 className="title">Phonebook</h1>
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
};

export default App;

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
