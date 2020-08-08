const express = require("express");

const ImportationService = require("../services/importations");
const importationsService = new ImportationService();

function apiImportation(app) {
  const router = express.Router();
  app.use("/importations", router);
  router.get("/", async (req, res, next) => {
    const { tags } = req.query;

    try {
      const buys = await importationsService.get({ tags });
      res.status(200).json(buys);
    } catch (err) {
      next(err);
    }
  });

  router.post("/", async (req, res, next) => {
    try {
      const buy = await importationsService.store({ importation: req.body });
      res.status(201).json(buy);
    } catch (err) {
      next(err);
    }
  });
}

module.exports = apiImportation;
