const Worker = require("../models/Worker");
const responseHTTP = require("../network/response");
const { validationResult } = require("express-validator");

const controller = {
  get: async (req, res) => {
    try {
      const workers = await Worker.find({});
      // .where("visible").equals(true);
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
  getWorkersByQuery: async (req, res) => {
    const { query, value } = req.query;

    try {
      const workers = await Worker.find({}).where(query).equals(value);

      if (!workers) {
        return responseHTTP.error(req, res, "No workers found", 404);
      }

      return responseHTTP.success(req, res, workers, 200);
    } catch (error) {
      return responseHTTP.error(req, res, "Internal error", 500, error);
    }
  },
  create: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return responseHTTP.error(req, res, { errors: errors.array() }, 422);
    }
    const { worker } = req.body;

    const workerExist = await Worker.findOne({ phone: worker.phone });

    if (workerExist) {
      return responseHTTP.error(
        req,
        res,
        {
          message: "That worker already exist",
        },
        422
      );
    }

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
      const updatedWorker = await Worker.findOneAndUpdate(
        { _id: req.params.id },
        worker,
        { new: true }
      );
      return responseHTTP.success(req, res, updatedWorker, 200);
    } catch (error) {
      return responseHTTP.error(req, res, "Internal error", 500, error);
    }
  },
  deleteAll: async (req, res) => {
    try {
      await Worker.deleteMany({});
      return responseHTTP.success(req, res, "All workers deleted", 200);
    } catch (error) {
      return responseHTTP.error(req, res, "Internal error", 500, error);
    }
  },
};

module.exports = controller;
