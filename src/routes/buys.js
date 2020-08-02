const express = require("express");
const router = express.Router();
const BuysService = require("../services/buys");
const buysService = new BuysService();

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


module.exports = router;