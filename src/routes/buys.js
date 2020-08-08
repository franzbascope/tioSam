const express = require("express");
const BuysService = require("../services/buys");
const buysService = new BuysService();

function apiBuys(app) {
  const router = express.Router();
  app.use("/buys", router);
  router.get("/", async (req, res, next) => {
    const { tags } = req.query;

    try {
      const buys = await buysService.get({ tags });
      res.status(200).json(buys);
    } catch (err) {
      next(err);
    }
  });

  router.post("/", async (req, res, next) => {
    try {
      const buy = await buysService.store({ buy: req.body });
      res.status(201).json(buy);
    } catch (err) {
      next(err);
    }
  });

  router.delete("/:buyId", async function (req, res, next) {
    const { buyId } = req.params;

    try {
      const deletedBuy = await buysService.delete({
        buyId,
      });

      res.status(200).json(deletedBuy);
    } catch (err) {
      next(err);
    }
  });

  router.get("/:buyId", async function (req, res, next) {
    const { buyId } = req.params;
    try {
      const buy = await buysService.edit({ buyId });
      res.status(200).json(buy);
    } catch (err) {
      next(err);
    }
  });

  router.put("/:buyId", async function (req, res, next) {
    const { buyId } = req.params;

    try {
      const updatedBuy = await buysService.update({
        buyId,
        buy: req.body,
      });
      res.status(200).json(updatedBuy);
    } catch (err) {
      next(err);
    }
  });
}

module.exports = apiBuys;
