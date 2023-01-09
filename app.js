const app = require("express")();

app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

module.exports = app;
