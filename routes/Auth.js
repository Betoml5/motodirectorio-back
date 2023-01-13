const router = require("express").Router();
const controller = require("../controllers/Auth");
const { body } = require("express-validator");
router.post(
  "/",
  body("phone").isLength({ min: 8 }),
  body("password").isAlphanumeric(),
  controller.login
);

module.exports = router;
