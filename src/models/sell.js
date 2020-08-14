const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { SellDetailSchema } = require("./sell_detail");
const { ClientSchema } = require("./client");
const mongoosePaginate = require("mongoose-paginate-v2");

const SellSchema = new Schema({
  details: [SellDetailSchema],
  created_at: { type: Date, default: Date.now },
  client: ClientSchema,
  delivery_cost: {
    type: Number,
    required: true,
  },
  total_payment: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    default: function () {
      if (this.subtotal) {
        return this.subtotal + 1;
      }
      return 0;
    },
  },
});

SellSchema.plugin(mongoosePaginate);

const Sell = mongoose.model("Sell", SellSchema);

module.exports = { Sell, SellSchema };
