const controller = require("../controllers/Worker");
const { verifyAuth } = require("../middlewares/index");
const router = require("express").Router();
const { createWorker } = require("../middlewares/validator");

router.get("/", controller.get);
router.get("/worker/self/profile", verifyAuth, controller.profile);
router.get("/worker/:id", controller.getOne);
router.get("/filter", controller.getWorkersByQuery);
router.post("/", createWorker, controller.create);
router.put("/:id", verifyAuth, controller.update);
router.delete("/:id", verifyAuth, controller.delete);
router.delete("/", verifyAuth, controller.deleteAll);
router.delete("/delete/many", verifyAuth, controller.deleteManyById);

module.exports = router;
