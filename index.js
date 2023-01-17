const app = require("./app");
const { connectDB } = require("./database");
connectDB();

//start server

app.listen(3013, () => {
  console.log("Server is running on port 3013");
});
