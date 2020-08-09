const express = require("express");

const ImportationService = require("../services/importations");
const importationsService = new ImportationService();

function apiImportation(app) {
  const router = express.Router();
  app.use("/importations", router);
  router.get("/", async (req, res, next) => {
    const { tags } = req.query;

    try {
      const myImport = await importationsService.get({ tags });
      res.status(200).json(myImport);
    } catch (err) {
      next(err);
    }
  });

  router.get("/:importId", async function (req, res, next) {
    const { importId } = req.params;
    try {
      const myImport = await importationsService.edit({ importId });
      res.status(200).json(myImport);
    } catch (error) {
      next(error);
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

  router.delete("/:importId", async function (req, res, next) {
    const { importId } = req.params;

    try {
      const deletedImport = await importationsService.delete({
        importId,
      });

      res.status(200).json(deletedImport);
    } catch (err) {
      next(err);
    }
  });

  router.put("/:importId", async function (req, res, next) {
    const { importId } = req.params;

    try {
      const updatedProduct = await importationsService.update({
        importId,
        importation: req.body,
      });
      res.status(200).json(updatedProduct);
    } catch (err) {
      next(err);
    }
  });
}

module.exports = apiImportation;
