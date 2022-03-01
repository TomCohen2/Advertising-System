import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home.js";

import ShowAllAds from "./components/ShowAllAds";
import EditAd from "./components/EditAd";
import CreateAd from "./components/CreateAd";
import MediaCard from "./components/MediaCard";
import Welcome from "./components/Welcome";

import "bootstrap/dist/css/bootstrap.min.css";

import reportWebVitals from "./reportWebVitals";
import { useLocation } from "react-router-dom";
import ViewAds from "./components/ViewAds";
console.log(localStorage.getItem("isAuthenticated"));

if (localStorage.getItem("isAuthenticated") === null) {
  localStorage.setItem("isAuthenticated", false);
}

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
