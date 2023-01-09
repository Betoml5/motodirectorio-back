const { config } = require("../config");
const mongoose = require("mongoose");
module.exports = {
  connectDB: async () => {
    try {
      await mongoose.connect(
        `mongodb+srv://${config.dbUser}:${config.dbPassword}@${config.dbHost}/${config.dbName}?retryWrites=true&w=majority`
      );
      console.log("Connected to DB");
    } catch (error) {
      console.log(error);
    }
  },
};
