const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;

const Worker = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  status: Boolean,
  rating: {
    Number,
    default: 0,
  },
  image: {
    type: String,
    default: "",
  },
  phone: {
    type: String,
    default: "",
  },
});

Worker.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (error) {
    return next(error);
  }
});

//pre-save
module.exports = mongoose.model("Worker", Worker);
