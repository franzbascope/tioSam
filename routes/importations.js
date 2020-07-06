const express = require("express");
const router = express.Router();
const ImportationService = require("../services/importations");
const importationsService = new ImportationService();

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

module.exports = router;
