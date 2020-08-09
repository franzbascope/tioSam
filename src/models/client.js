var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const ClientSchema = new Schema({
  name: {
    type: String,
  },
  cellphone_number: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    enum: ["SCZ", "CBBA"],
    default: "SCZ",
  },
});

const Client = mongoose.model("Client", ClientSchema);

module.exports = { Client, ClientSchema };
