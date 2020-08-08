const express = require("express");
const router = express.Router();
const SellsService = require("../services/sells");
const sellsService = new SellsService();

function apiSells(app) {
  const router = express.Router();
  app.use("sells", router);
  router.get("/", async (req, res, next) => {
    const { tags } = req.query;

    try {
      const sells = await sellsService.get({ tags });
      res.status(200).json({
        data: sells,
      });
    } catch (err) {
      next(err);
    }
  });

  router.get("/:sellId", async function (req, res, next) {
    const { sellId } = req.params;
    try {
      const sell = await sellsService.edit({ sellId });
      res.status(200).json(sell);
    } catch (err) {
      next(err);
    }
  });

  router.post("/", async (req, res, next) => {
    try {
      const sell = await sellsService.store({ sell: req.body });
      res.status(201).json({
        data: sell,
      });
    } catch (err) {
      next(err);
    }
  });

  router.put("/:sellId", async function (req, res, next) {
    const { sellId } = req.params;

    try {
      const updatedService = await sellsService.update({
        sellId,
        sell: req.body,
      });
      res.status(200).json(updatedService);
    } catch (err) {
      next(err);
    }
  });

  router.delete("/:sellId", async function (req, res, next) {
    const { sellId } = req.params;
    try {
      const deletedSell = await sellsService.delete({
        sellId,
      });
      res.status(200).json(deletedSell);
    } catch (err) {
      next(err);
    }
  });
}

module.exports = apiSells;
