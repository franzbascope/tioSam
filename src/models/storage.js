var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const { ProductStorageSchema, ProductStorage } = require("./product_storage");

const StorageSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  products_storage: [ProductStorageSchema],
  importations: [{ type: Schema.Types.ObjectId, ref: "Importation" }],
});

StorageSchema.methods.addImportation = function (importation) {
  this.importations.push(importation._id);

  console.log("importation", this.importations);
  return this;
};

const addProductsToProductStorage = (products) => {
  let productStorageArray = [];
  for (let product of products) {
  }
};

const Storage = mongoose.model("Storage", StorageSchema);

module.exports = { Storage, StorageSchema };
