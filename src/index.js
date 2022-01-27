import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
// UTILS
import store from "./utils/redux/store";
// OTHER
import { Helmet } from "react-helmet";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
// FIREBASE
import { FirebaseContextProvider } from "./utils/firebase/firebaseContext";

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Helmet>
        <title>Vision</title>
        <script
          type="text/javascript"
          src="https://js.live.net/v7.2/OneDrive.js"
        />
        <script
          type="text/javascript"
          src="https://apis.google.com/js/api.js"
        />
        <script
          type="text/javascript"
          src="https://www.dropbox.com/static/api/2/dropins.js"
          id="dropboxjs"
          data-app-key={process.env.REACT_APP_DROPBOX_APP_KEY}
        ></script>
      </Helmet>
      <BrowserRouter>
        <FirebaseContextProvider>
          <App />
        </FirebaseContextProvider>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
