var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const params = require("../utils/params");

const ImportationSchema = new Schema({
  departure_date: {
    type: Date,
    required: true,
  },
  arrival_date: {
    type: Date,
  },
  state: {
    type: String,
    enum: ["USA", "TRANSIT", "BO"],
    default: "USA",
  },
  value_dollars: {
    type: Number,
    default: function () {
      let value_dollars = 0;
      for (let buy of this.buys) {
        value_dollars += buy.cost_dollars;
      }
      return value_dollars;
    },
  },
  value_bs: {
    type: Number,
    default: function () {
      return params.exchange_rate * this.value_dollars;
    },
  },
  shipping_estimated_kg: {
    type: Number,
    default: function () {
      let shipping_estimated = 0;
      for (let buy of this.buys) {
        shipping_estimated += buy.total_weight_grams;
      }
      return shipping_estimated / params.gramsInKg;
    },
  },
  shipping_real_kg: {
    type: Number,
    required: true,
  },
  shipping_cost_dollars: {
    type: Number,
    default: function () {
      return params.price_kg * this.shipping_real_kg;
    },
  },
  buys: [{ type: Schema.Types.ObjectId, ref: "Buy" }],
});

const Importation = mongoose.model("Importation", ImportationSchema);

module.exports = { Importation, ImportationSchema };
