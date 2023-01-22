const app = require("./app");
const { connectDB } = require("./database");
const { config } = require("./config");
connectDB();

//start server

app.listen(config.port || 3030, () => {
  console.log(`Server is running on port ${config.port}`);
});
