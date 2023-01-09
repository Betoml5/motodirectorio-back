const router = require("express").Router();
const controller = require("../controllers/Auth");
router.post("/", controller.login);

module.exports = router;
