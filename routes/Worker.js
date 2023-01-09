const controller = require("../controllers/Worker");

const router = require("express").Router();


router.get('/', controller.getWorkers);
