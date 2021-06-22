import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyAud6WNShf5yU_VJYS0JwXuWBplefPbRMw",
  authDomain: "shoozie-c1fe4.firebaseapp.com",
  databaseURL: "https://shoozie-c1fe4.firebaseio.com",
  projectId: "shoozie-c1fe4",
  storageBucket: "shoozie-c1fe4.appspot.com",
  messagingSenderId: "612854692662",
  appId: "1:612854692662:web:e388141b90055b398c9197",
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
