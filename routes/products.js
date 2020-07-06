const express = require("express");
const router = express.Router();
const ProductsService = require("../services/products");
const productsService = new ProductsService();

router.get("/", async (req, res, next) => {
  const { tags } = req.query;

  try {
    const products = await productsService.get({ tags });
    res.status(200).json(products);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.get("/:productId", async function (req, res, next) {
  const { productId } = req.params;
  try {
    const product = await productsService.edit({ productId });
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const product = await productsService.store({ product: req.body });
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
});

router.delete("/:productId", async function (req, res, next) {
  const { productId } = req.params;

  try {
    const deletedProduct = await productsService.delete({
      productId,
    });

    res.status(200).json(deletedProduct);
  } catch (err) {
    next(err);
  }
});

router.put("/:productId", async function (req, res, next) {
  const { productId } = req.params;

  try {
    const updatedProduct = await productsService.update({
      productId,
      product: req.body,
    });
    res.status(200).json(updatedProduct);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
