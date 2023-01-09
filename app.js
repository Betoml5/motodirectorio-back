const app = require("express")();
const express = require("express");
const mongoose = require("mongoose");
const { connectDB } = require("./database");

mongoose.set("strictQuery", false);
connectDB();

app.use(express.json());

app.use("/api/auth", require("./routes/Auth"));
app.use("/api/worker", require("./routes/Worker"));
app.use("/api/review", require("./routes/Review.js"));

module.exports = app;
