var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const { BuySchema } = require("./buys");

const ImportationSchema = new Schema({
  departure_date: {
    type: Date,
    required: true,
  },
  arrival_date: {
    type: Date,
  },
  storage: { type: Schema.Types.ObjectId, ref: "Storage", required: true },
  value_dollars: {
    type: Number,
    default: function () {},
  },
  value_bs: {
    type: Number,
  },
  shipping_estimated_kg: {
    type: Number,
  },
  shipping_real_kg: {
    type: Number,
    required: true,
  },
  shipping_cost_dollars: {
    type: Number,
  },
  buys: [BuySchema],
});

const Importation = mongoose.model("Importation", ImportationSchema);

module.exports = { Importation, ImportationSchema };
