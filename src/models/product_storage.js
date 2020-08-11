var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const { ProductSchema } = require("./product");

const ProductStorageSchema = new Schema({
  units: {
    type: Number,
    required: true,
  },
  units: {
    type: Number,
    required: true,
  },
  product: ProductSchema,
});

const ProductStorage = mongoose.model("ProductStorage", ProductStorageSchema);

module.exports = { ProductStorage, ProductStorageSchema };
