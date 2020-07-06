var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const { ProductBuySchema } = require("./product_buy");
const params = require("../utils/params");

const BuySchema = new Schema({
  name: {
    type: String,
    default: function () {
      return `${this.location} ${this.date.toLocaleString()}`;
    },
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
    default: function () {
      if (this.products) {
        let total = 0;
        for (let product of this.products) {
          total += product.cost_dollars * product.quantity;
        }
        return total + this.taxes;
      }
      return 0;
    },
  },
  taxes: {
    type: Number,
    required: true,
  },
  cost_bs: {
    type: Number,
    default: function () {
      console.log(this.cost_dollars);
      return this.cost_dollars * params.exchange_rate;
    },
  },
  total_weight_grams: {
    type: Number,
    default: function () {
      if (this.products) {
        let total = 0;
        for (let product of this.products) {
          total += product.weight;
        }
        return total;
      }
      return 0;
    },
  },

  products: [ProductBuySchema],
});

const Buy = mongoose.model("Buy", BuySchema);

module.exports = { Buy, BuySchema };
