// server.js
require("dotenv").config();
const express = require("express");
const http = require("http");

const cors = require("cors"); // added

const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 8000;

// routes
const ad = require("./routes/ad"); // added
const admin = require("./routes/admin");

// cors
app.use(cors({ origin: true, credentials: true })); // added

// connect database
connectDB();

// initialize middleware
app.use(express.json({ extended: false }));
app.get("/", (req, res) => res.send("Server up and running"));

// use routes
app.use("/api/ad", ad); // added
app.use("/api/admin", admin); // added

// setting up port

const server = app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});

var io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

let clientsConnected = [];
let amountOfClientsConnected = 0;

io.on("connection", (socket) => {
  socket.emit("stats", amountOfClientsConnected, clientsConnected); //sends the stats to the client, so it can be displayed on the dashboard

  socket.on("screenConnect", (arg) => {
    // checks if the new connection allready exists
    if (!clientsConnected.includes(arg) && arg !== "'screen=0'") {
      // or that its the admin screen
      clientsConnected.push(arg);
      amountOfClientsConnected = clientsConnected.length;
    }
    socket.emit("clients", amountOfClientsConnected, clientsConnected); //sends stats to Welcome.js

    socket.on("disconnect", () => {
      // finds the disconnected client and remove from the array
      clientsConnected = clientsConnected.filter((a) => a !== arg);
      amountOfClientsConnected = clientsConnected.length;
      socket.emit("clients", amountOfClientsConnected, clientsConnected); // sends stats
    });

    console.log(clientsConnected);
  });
});
