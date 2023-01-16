const controller = require("../controllers/Worker");
const middlewares = require("../middlewares");
const router = require("express").Router();
const { createWorker } = require("../middlewares/validator");

router.get("/", controller.get);
router.get("/worker/self/profile", middlewares.verifyAuth, controller.profile);
router.get("/worker/:id", controller.getOne);
router.get("/filter", controller.getWorkersByQuery);
router.post("/", createWorker, controller.create);
router.put("/:id", middlewares.verifyAuth, controller.update);
router.delete("/:id", middlewares.verifyAuth, controller.delete);
router.delete("/", middlewares.verifyAuth, controller.deleteAll);
router.delete(
  "/delete/many",
  middlewares.verifyAuth,
  controller.deleteManyById
);

module.exports = router;
