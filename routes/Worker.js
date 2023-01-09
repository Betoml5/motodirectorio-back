const controller = require("../controllers/Worker");
const router = require("express").Router();
const { body, validationResult } = require("express-validator");

router.get("/", controller.get);
router.get("/:id", controller.getOne);
router.post(
  "/",
  body("worker.name").isString(),
  body("worker.lastName").isString(),
  body("worker.password").isAlphanumeric(),
  body("worker.phone").isString(),
  controller.create
);

module.exports = router;
