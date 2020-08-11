var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const { ImportationSchema } = require("./importations");
const { ProductStorageSchema } = require("./product_storage");

const StorageSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  products_storage: [ProductStorageSchema],
  importations: [ImportationSchema],
});

const Storage = mongoose.model("Storage", StorageSchema);

module.exports = { Storage, StorageSchema };
