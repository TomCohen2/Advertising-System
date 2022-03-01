import React from "react";
import { useParams } from "react-router-dom";
import "./EditAd.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { useLocation } from "react-router-dom";

function EditAd() {
  const params = useParams();
  let location = useLocation();
  console.log(location.pathname);

  const [ads, setAds] = useState([]);
  const [currentAd, setCurrentAd] = useState([]);
  const [data, setData] = useState({
    name: "",
    description: "",
    image: "",
    screens: "",
  });
  const navigate = useNavigate();

  function handleChange(e) {
    setData((data) => ({ ...data, [e.target.name]: e.target.value }));
    console.log(data);
  }

  function handleSubmit(e) {
    console.log("click");
    e.preventDefault();
    const ad = {
      name: data.name,
      description: data.description,
      image: data.image,
      screens: data.screens,
    };
    console.log(params.id);

    axios
      .put(`http://localhost:8000/api/ad/${params.id}`, data)
      .then((res) => {
        setData({
          name: "",
          description: "",
          image: "",
          screens: "",
          duration: "",
        });
        console.log(res.data.message);
      })
      .catch((err) => {
        console.log("Error couldn't create TODO");
        console.log(err.message);
      });

    setTimeout(() => {
      navigate("/allads");
    }, 1000);
  }

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/ad/`)
      .then((res) => {
        setAds(res.data.filter((ad) => ad._id == `${params.id}`));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  let filterAd = ads.filter((ad) => ad._id == `${params.id}`);

  //   console.log(ads);

  return (
    <div className="thepage">
      <div className="page">
        <div>
          <Button
            className="btn"
            size="large"
            href="/screen=0"
            color="secondary"
            variant="contained"
          >
            Back To Admin Screen
          </Button>
          <h1>Edit Ad Form ➔</h1>
        </div>
        <div>
          <form className="form">
            <h1>{` Editing ${!ads[0] ? "loading" : ads[0].name}`}</h1>
            <p className="editP">{` Ad current details: ${
              !ads[0]
                ? "loading"
                : `${
                    "Title: " +
                    ads[0].name +
                    " | Screens:" +
                    ads[0].screens +
                    "| Image URL: " +
                    ads[0].image
                  }`
            }`}</p>
            <div className="myinput">
              <label>Id:</label>
              <input type="text" placeholder={params.id} disabled />
            </div>
            <div className="myinput">
              <label>Title</label>
              <input
                onChange={handleChange}
                type="text"
                name="name"
                placeholder={!ads[0] ? "loading" : ads[0].name}
              />
            </div>
            <div className="myinput">
              <label>Description</label>
              <input
                onChange={handleChange}
                type="text"
                name="description"
                placeholder={!ads[0] ? "loading" : ads[0].description}
              />
            </div>
            <div className="myinput">
              <label>Image URL</label>
              <input
                onChange={handleChange}
                type="text"
                name="image"
                placeholder={!ads[0] ? "loading" : ads[0].image}
              />
            </div>
            <div className="myinput">
              <label>Screens</label>
              <input
                onChange={handleChange}
                type="text"
                name="screens"
                placeholder={!ads[0] ? "loading" : ads[0].screens}
              />
            </div>
            <div className="myinput">
              <label>Ad duration</label>
              <input
                onChange={handleChange}
                type="text"
                name="duration"
                placeholder={!ads[0] ? "loading" : ads[0].duration}
              />
            </div>

            <button onClick={handleSubmit}>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditAd;
