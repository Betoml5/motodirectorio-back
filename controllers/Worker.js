const Worker = require("../models/Worker");
const responseHTTP = require("../network/response");
const controller = {
  get: async (req, res) => {
    try {
      const workers = await Worker.find({});
      if (!workers) {
        return responseHTTP.error(req, res, "No workers found", 404);
      }
      return responseHTTP.success(req, res, workers, 200);
    } catch (error) {
      return responseHTTP.error(req, res, "Internal error", 500, error);
    }
  },
  getOne: async (req, res) => {
    try {
      const worker = await Worker.findById(req.params.id);
      if (!worker) {
        return responseHTTP.error(req, res, "Worker not found", 404);
      }
      return responseHTTP.success(req, res, worker, 200);
    } catch (error) {
      return responseHTTP.error(req, res, "Internal error", 500, error);
    }
  },
  create: async (req, res) => {
    const { worker } = req.body;

    try {
      const newWorker = await Worker.create(worker);
      return responseHTTP.success(req, res, newWorker, 201);
    } catch (error) {
      return responseHTTP.error(req, res, "Internal error");
    }
  },
  delete: async (req, res) => {
    try {
      const worker = await Worker.findById(req.params.id);
      if (!worker) {
        return responseHTTP.error(req, res, "Worker not found", 404);
      }
      await Worker.findByIdAndDelete(req.params.id);
      return responseHTTP.success(req, res, "Worker deleted", 200);
    } catch (error) {
      return responseHTTP.error(req, res, "Internal error", 500, error);
    }
  },
  update: async (req, res) => {
    const { worker } = req.body;
    try {
      const isWorker = await Worker.findById(req.params.id);
      if (!isWorker) {
        return responseHTTP.error(req, res, "Worker not found", 404);
      }
      const updatedWorker = await Worker.findByIdAndUpdate(
        req.params.id,
        worker
      );
      return responseHTTP.success(req, res, updatedWorker, 200);
    } catch (error) {
      return responseHTTP.error(req, res, "Internal error", 500, error);
    }
  },
};

module.exports = controller;
