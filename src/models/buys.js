var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const { ProductBuySchema } = require("./product_buy");


const BuySchema = new Schema({
  name: {
    type: String,
  },
  date: {
    type: Date,
    required: true,
  },
  payment_type: {
    type: String,
    enum: ["BNB_VISA_CARD_BOLIVIA", "PNC_CARD_USA"],
    default: "BNB VISA CARD BOLIVIA",
  },
  location: {
    type: String,
    enum: ["COSTCO_STORE", "COSTCO_ONLINE"],
    default: "COSTCO_STORE",
  },
  cost_dollars: {
    type: Number,
  },
  taxes: {
    type: Number,
    required: true,
  },
  cost_bs: {
    type: Number,
  },
  total_weight_kg: {
    type: Number,
  },

  products: [ProductBuySchema],
});

const Buy = mongoose.model("Buy", BuySchema);

module.exports = { Buy, BuySchema };
