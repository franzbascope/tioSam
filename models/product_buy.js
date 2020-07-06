var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const params = require("../utils/params");

const ProductBuySchema = new Schema({
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
        return this.cost_dollars * params.exchange_rate;
      }
      return 0;
    },
  },
  total_cost_dollars: {
    type: Number,
    default: function () {
      if (this.weight) {
        return (
          (this.weight * params.price_kg) / params.gramsInKg + params.price_kg
        );
      }
      return 0;
    },
  },
  total_cost_bs: {
    type: Number,
    default: function () {
      if (this.total_cost_dollars) {
        return this.total_cost_dollars * params.exchange_rate;
      }
      return 0;
    },
  },
  weight: {
    type: Number,
    required: true,
  },
  price_bs: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  company: { type: Schema.Types.ObjectId, ref: "Company", required: true },
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
});

const ProductBuy = mongoose.model("ProductBuy", ProductBuySchema);

module.exports = { ProductBuy, ProductBuySchema };
