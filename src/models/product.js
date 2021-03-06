var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const params = require("../utils/params");
const mongoosePaginate = require("mongoose-paginate-v2");

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  cost_dollars: {
    type: Number,
    required: true,
  },
  total_cost_dollars: {
    type: Number,
    required: true,
  },
  total_cost_bs: {
    type: Number,
    required: true,
  },
  total_cost_unit_bs: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  price_bs: {
    type: Number,
    required: true,
  },
  lot: {
    type: Number,
    required: true,
  },
  price_wholesale_bs: {
    type: Number,
    required: true,
  },
  price_lot_bs: {
    type: Number,
    required: true,
  },
  company: { type: Schema.Types.ObjectId, ref: "Company", required: true },
});

const addCalculatedProperties = (product) => {
  product.total_cost_dollars = (
    (product.weight * params.price_kg) / params.gramsInKg +
    product.cost_dollars
  ).toFixed(2);
  product.total_cost_bs = (
    product.total_cost_dollars * params.exchange_rate
  ).toFixed(2);
  product.total_cost_unit_bs = (product.total_cost_bs / product.lot).toFixed(2);
  return product;
};

ProductSchema.plugin(mongoosePaginate);

const Product = mongoose.model("Product", ProductSchema);

module.exports = { Product, ProductSchema, addCalculatedProperties };
