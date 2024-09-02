import React from "react";
import ReactDOM from "react-dom/client";
// redux
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store";
// redux-persist
import { PersistGate } from "redux-persist/integration/react"; // + already: import { persistor } from "./redux/store"
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
