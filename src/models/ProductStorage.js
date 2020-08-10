var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const ProductStorageSchema = new Schema({
  units: {
    type: Number,
    required: true,
  },
  units: {
    type: Number,
    required: true,
  },
  product: { type: Schema.Types.ObjectId, ref: "Product" },
});

const ProductStorage = mongoose.model("ProductStorage", ProductStorageSchema);

module.exports = { ProductStorage, ProductStorageSchema };
