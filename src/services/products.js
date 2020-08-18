const productsMock = require("../utils/mocks/products");
const { Product, addCalculatedProperties } = require("../models/product");
const { Company } = require("../models/company");
const Boom = require("boom");
const { paginateModel } = require("./functions/pagination");
const { buildQuery } = require("./functions/build-query");

class ProductsService {
  constructor() {}

  async getAll() {
    return await Product.find().populate("company");
  }
  async get(req) {
    const { pageNum } = req.params;
    const num = Number(pageNum);
    
    return await paginateModel({
      model: Product,
      query: Product.find(buildQuery(req)).populate("company"),
      page: num,
    });
  }

  async edit({ productId }) {
    try {
      return await Product.findById(productId).populate("company");
    } catch (e) {
      throw Boom.notFound(e);
    }
  }
  async store({ product }) {
    let newProduct = new Product(product);
    newProduct = addCalculatedProperties(newProduct);
    console.log("newProduct", newProduct);
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
      product = addCalculatedProperties(product);
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
      return await Product.findByIdAndDelete(productId);
    } catch (e) {
      throw Boom.notFound(e);
    }
  }
}

module.exports = ProductsService;
