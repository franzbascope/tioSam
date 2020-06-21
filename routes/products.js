const express = require("express");
const router = express.Router();
const ProductsService = require("../services/products");
const productsService = new ProductsService();

router.get("/", async (req, res, next) => {
  const { tags } = req.query;

  try {
    const products = await productsService.get({ tags });
    res.status(200).json({
      data: products,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
