const controller = require("../controllers/Worker");
const router = require("express").Router();
const { createWorker } = require("../middlewares/validator");

router.get("/", controller.get);
router.get("/worker/:id", controller.getOne);
router.get("/filter", controller.getWorkersByQuery);
router.post("/", createWorker, controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);
router.delete("/", controller.deleteAll);

module.exports = router;
