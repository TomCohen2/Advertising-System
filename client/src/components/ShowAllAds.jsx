import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import "./ShowAllAds.css";
import { useParams } from "react-router-dom";
import MediaCard from "./MediaCard";
import Button from "@mui/material/Button";

function ShowAllAds() {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/ad")
      .then((res) => {
        setAds(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  let list = ads.map((ad) => {
    <div>{ad.name}</div>;
  });
  console.log(ads);

  return (
    <section className="container">
      <section className="contents">
        <div className="btnDiv">
          <Button
            className="btn"
            size="large"
            href="/screen=0"
            color="secondary"
            variant="contained"
          >
            Back To Admin Screen
          </Button>
          <Button
            className="btn"
            size="large"
            href="/create-ad"
            color="secondary"
            variant="contained"
          >
            Create new Ad
          </Button>
        </div>

        <div className="page">
          {ads.map((ad, index) => (
            <MediaCard key={index} ad={ad} />
          ))}
        </div>
      </section>
    </section>
  );
}

export default ShowAllAds;
