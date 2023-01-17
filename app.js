const app = require("express")();
const express = require("express");
const mongoose = require("mongoose");
const { connectDB } = require("./database");
const passport = require("passport");
const cors = require("cors");

mongoose.set("strictQuery", false);

app.use(express.json());
app.use(cors("*"));

app.use(passport.initialize());
require("./auth/index");

app.use("/api/auth", require("./routes/Auth"));
app.use("/api/workers", require("./routes/Worker"));
app.use("/api/reviews", require("./routes/Review.js"));

module.exports = app;
