var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const pricePerKg = 30;
const exchangeRate = 6.97;
const gramsInKg = 1000;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  cost_dollars: {
    type: Number,
    required: true,
  },
  cost_bs: {
    type: Number,
    default: function () {
      if (this.cost_dollars) {
        return this.cost_dollars * exchangeRate;
      }
      return 0;
    },
  },
  total_cost_dollars: {
    type: Number,
    default: function () {
      if (this.weight) {
        return (this.weight * pricePerKg) / gramsInKg + this.cost_dollars;
      }
      return 0;
    },
  },
  total_cost_bs: {
    type: Number,
    default: function () {
      if (this.total_cost_dollars) {
        return this.total_cost_dollars * exchangeRate;
      }
      return 0;
    },
  },
  weight: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  company: { type: Schema.Types.ObjectId, ref: "Company", required: true },
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = { Product, ProductSchema };
