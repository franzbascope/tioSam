var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const { ProductSchema } = require("./product");
const exchangeRate = 6.97;

const ImportationSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  state: {
    type: String,
    enum: ["USA", "TRANSIT", "BO"],
    default: "USA",
  },
  total_value_dollars: {
    type: Number,
    default: function () {
      if (this.cost_dollars) {
        return this.cost_dollars * exchangeRate;
      }
      return 0;
    },
  },
  total_value_bs: {
    type: Number,
    default: function () {
      if (this.cost_dollars) {
        return this.cost_dollars * exchangeRate;
      }
      return 0;
    },
  },
  products: [ProductSchema],
});

const Importation = mongoose.model("Importation", ImportationSchema);

module.exports = { Importation, ImportationSchema };
