const { check } = require("express-validator");

exports.createWorker = [
  check("worker.name").isString(),
  check("worker.lastName").isString(),
  check("worker.password").isAlphanumeric().isLength({ min: 8 }),
  check("worker.phone").isString().isLength({ min: 10 }),
];

exports.loginUser = [
  check("password").isAlphanumeric(),
  check("phone").isString().isLength({ min: 10 }),
];
