const express = require("express");
const router = express.Router();
const { Company } = require("../models/company");

router.get("/", async (req, res, next) => {
  try {
    const companies = await Company.find();
    res.status(200).json(companies);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
