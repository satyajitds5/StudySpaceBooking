const express = require("express");
// import express from "express";
const app = express();

// To use DotEnv data
require("dotenv").config();



const dbConfig = require("./config/dbConfig");
const port = process.env.PORT || 6000;
//initialising middleware
app.use(express.json());

const usersRoute = require("./routes/usersRoute");
const spacesRoute = require("./routes/spacesRoute");
const bookingsRoute = require("./routes/bookingsRoute");

app.use("/api/users", usersRoute);
app.use("/api/spaces", spacesRoute);
app.use("/api/bookings", bookingsRoute);

const path = require("path");
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client/build/index.html"));
  });
}

app.listen(port, () => console.log(`Node Server listening on Port ${port}`));
