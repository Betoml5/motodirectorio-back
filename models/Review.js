const mongoose = require("mongoose");

const Review = new mongoose.Schema({
  worker: {
    type: mongoose.Schema.Types.ObjectId,
  },
  text: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Review", Review);
