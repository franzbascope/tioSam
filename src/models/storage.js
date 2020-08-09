var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const StorageSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  products: [{ type: Schema.Types.ObjectId, ref: "ProductStorage" }],
});

const Storage = mongoose.model("Storage", StorageSchema);

module.exports = { Storage, StorageSchema };
