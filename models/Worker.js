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
    minLength: 8,
  },
  status: {
    type: Boolean,
    default: false,
  },
  rating: {
    Number,
    default: 0,
  },
  image: {
    type: String,
    default: "",
  },
  phone: {
    unique: true,
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  visible: {
    type: Boolean,
    default: false,
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  roles: {
    type: Array,
    default: ["WORKER"],
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

Worker.validatePassword = async function validatePassword(password) {
  return bcrypt.compare(password, this.password);
};

//pre-save
module.exports = mongoose.model("Worker", Worker);
