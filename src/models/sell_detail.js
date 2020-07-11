const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ProductSchema } = require("./product");

const SellDetailSchema = new Schema({
  product: ProductSchema,
  subtotal: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const SellDetail = mongoose.model("SellDetail", SellDetailSchema);

module.exports = { SellDetail, SellDetailSchema };
