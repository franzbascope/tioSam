const productsMock = require("../utils/mocks/products");
const { Product } = require("../models/product");
const Boom = require("boom");

class ProductsService {
  constructor() {}

  get() {
    return Product.find();
  }
  edit({ productId }) {
    return Product.findById(productId);
  }
  async store({ product }) {
    console.log(product);
    let newProduct = new Product(product);
    try {
      newProduct = await newProduct.save();
      return newProduct;
    } catch (e) {
      throw Boom.badData("Missing required fields", e);
    }
  }
  async update({ productId, product }) {
    const options = { new: true };
    let updatedProduct = await Product.findByIdAndUpdate(
      productId,
      product,
      options
    );
    return updatedProduct;
  }
  delete({ productId }) {
    return Product.findByIdAndDelete(productId);
  }
}

module.exports = ProductsService;
