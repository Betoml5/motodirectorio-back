const { check } = require("express-validator");

exports.createWorker = [
  check("worker.name").isString(),
  check("worker.lastName").isString(),
  check("worker.password").isAlphanumeric(),
  check("worker.phone").isString().exists(),
];

exports.loginUser = [
  check("password").isAlphanumeric(),
  check("phone").isString().isLength({ min: 8 }),
];
