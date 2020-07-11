const productsMock = require("../utils/mocks/products");
const { Product } = require("../models/product");
const { Company } = require("../models/company");
const Boom = require("boom");

class ProductsService {
  constructor() {}

  async get() {
    return await Product.find().populate("company");
  }
  async edit({ productId }) {
    try {
      return await Product.findById(productId);
    } catch (e) {
      throw Boom.notFound(e);
    }
  }
  async store({ product }) {
    let newProduct = new Product(product);
    try {
      newProduct = await newProduct.save();
      return newProduct;
    } catch (e) {
      throw Boom.badData(e);
    }
  }
  async update({ productId, product }) {
    const options = { new: true };
    try {
      let updatedProduct = await Product.findByIdAndUpdate(
        productId,
        product,
        options
      );
      return updatedProduct;
    } catch (e) {
      throw Boom.notFound();
    }
  }
  async delete({ productId }) {
    try {
      console.log("hola mundo");
      return await Product.findByIdAndDelete(productId);
    } catch (e) {
      throw Boom.notFound(e);
    }
  }
}

module.exports = ProductsService;
