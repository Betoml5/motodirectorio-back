const Worker = require("../models/Worker")

const controller = {

    getWorkers: async (req, res) => {
        const workers = await Worker.find({});
        if (!workers) {
            res.status(404).send({ message: "No workers found", wo });
        }
    }

};

module.exports = controller;
