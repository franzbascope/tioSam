const productsMock = require("../utils/mocks/products");
const { Product, addCalculatedProperties } = require("../models/product");
const { Company } = require("../models/company");
const Boom = require("boom");
const { paginateModel } = require("./functions/pagination");
const { MongooseQueryParser } = require("mongoose-query-parser");
const parser = new MongooseQueryParser();
class ProductsService {
  constructor() {}

  async get(req) {
    //example obsolete ?price_bs=price_bs<=140&weight=weight>50
    //example ?name=/Minox/&weight=weight>100
    //example ?price_bs=<=140&weight=>50
    //example ?name==/Minox/&price_bs=<=140&weight=>50

    const { pageNum } = req.params;
    const num = Number(pageNum);
    //console.log(req.query);
    let query = "";
    let sep = "";
    for (let key in req.query) {
      let cond = req.query[key];
      query += sep + key + cond;
      sep = "&";
    }

    const rquery = parser.parse(query);
    //console.log(rquery);
    return await paginateModel({
      model: Product,
      query: Product.find(rquery.filter).populate("company"),
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
