const express = require("express");
const router = express.Router();
const SellsService = require("../services/sells");
const sellsService = new SellsService();

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

module.exports = router;
