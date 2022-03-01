import React, { useContext, useState, useEffect } from "react";
import "./Welcome.css";
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";

import socketClient from "socket.io-client";

const SERVER = "http://localhost:8000/";

function Card({ title, amount }) {
  return (
    <div className="card">
      <h2>{`${title}  ${amount}`}</h2>
    </div>
  );
}

function Welcome(props) {
  var socket = socketClient(SERVER);
  const [amount, setAmount] = useState(0);
  const [array, setArray] = useState([]);
  // console.log(localStorage.getItem("isAuthenticated"));

  useEffect(() => {
    socket.on("stats", (amount, array) => {
      setAmount(amount);
      setArray(array);
    });
  }, [amount]);

  const clients = array.map((a, index) => (
    <Link to={a} key={index} style={{ textDecoration: "none", color: "black" }}>
      <Card key={index} title={a.slice(a.indexOf("=") + 1)} amount={""}>
        {a}
      </Card>
    </Link>
  ));

  return (
    <div className="banner">
      <div className="banner__search">
        <h2>Welcome to our Ads-System Admin Dashboard</h2>
      </div>
      <div className="banner__info">
        <h2>Use the navigation bar above to start navigate in app</h2>
        <h1>Get out and strech your imagination</h1>
        <h5>
          Plan a different kind of gateway to uncover the hidden gems near you.
        </h5>
      </div>
      <div className="banner__stats">
        <h4>{`Active Screens: ${amount}`}</h4>
        <h2>Connected clients</h2>
        <div className="list">
          {clients.length == 0 ? "No active clients" : clients}
        </div>
      </div>
      <Divider />

      <footer>
        By Tomer Cohen, Guy Levy, Gili Shukrun, Shir Fogel and Omer Tati
      </footer>
    </div>
  );
}

export default Welcome;
