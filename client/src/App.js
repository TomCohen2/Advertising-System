import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { useEffect } from "react";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home.js";
import ShowAllAds from "./components/ShowAllAds";
import EditAd from "./components/EditAd";
import CreateAd from "./components/CreateAd";
import MediaCard from "./components/MediaCard";
import Welcome from "./components/Welcome";
import "bootstrap/dist/css/bootstrap.min.css";
import reportWebVitals from "./reportWebVitals";
import ViewAds from "./components/ViewAds";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import SignIn from "./components/SignIn";
import ProtectedRoute from "./components/ProtectedRoute";
const SERVER = "http://localhost:8000/";

function App() {
  let auth = localStorage.getItem("isAuthenticated");
  let finalAuth = auth.toString().includes("true");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(finalAuth);
    // console.log("Changed");
  }, [isAuthenticated]);
  return (
    <>
      <Home />
      <Routes>
        <Route
          path="/screen=0"
          element={isAuthenticated ? <Welcome /> : <SignIn />}
        />

        <Route path="/screen=:id" element={<ViewAds />} />
        <Route
          path="/allads"
          element={isAuthenticated ? <ShowAllAds /> : <SignIn />}
        />
        <Route
          path="/edit-ad/:id"
          element={isAuthenticated ? <EditAd /> : <SignIn />}
        />
        <Route
          path="/create-ad"
          element={isAuthenticated ? <CreateAd /> : <SignIn />}
        />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/" element={<SignIn />} />
      </Routes>
    </>
  );
}

export default App;
