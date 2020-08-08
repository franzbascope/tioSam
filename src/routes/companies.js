const express = require("express");

const { Company } = require("../models/company");

function companiesApi(app) {
  const router = express.Router();
  app.use("/companies", router);
  router.get("/", async (req, res, next) => {
    try {
      const companies = await Company.find();
      res.status(200).json(companies);
    } catch (err) {
      next(err);
    }
  });
}

module.exports = companiesApi;
