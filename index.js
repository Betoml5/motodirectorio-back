const app = require("./app");
const { connectDB } = require("./database");
const { config } = require("./config");
connectDB();

//start server

app.listen(config.port || 3013, () => {
  console.log("Server is running on port 3013");
});
