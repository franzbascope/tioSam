var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const params = require("../utils/params");
const { Buy } = require("./buys");

const ImportationSchema = new Schema({
  departure_date: {
    type: Date,
    required: true,
  },
  arrival_date: {
    type: Date,
  },
  state: {
    type: String,
    enum: ["USA", "TRANSIT", "BO"],
    default: "USA",
  },
  value_dollars: {
    type: Number,
    default: function () {
      let value_dollars = 0;
      for (let buy of this.buys) {
        Buy.findOne(buy).then((foundBuy) => {
          value_dollars += foundBuy.cost_dollars;
        });
      }
      return value_dollars;
    },
  },
  value_bs: {
    type: Number,
    default: function () {
      return params.exchange_rate * this.value_dollars;
    },
  },
  shipping_estimated_kg: {
    type: Number,
  },
  shipping_real_kg: {
    type: Number,
    required: true,
  },
  shipping_cost_dollars: {
    type: Number,
    default: function () {
      if (this.shipping_real_kg) return params.price_kg * this.shipping_real_kg;
      return 0;
    },
  },
  buys: [{ type: Schema.Types.ObjectId, ref: "Buy" }],
});

ImportationSchema.pre("save", async function () {
  let shipping_estimated_kg = 0;
  for (let buy of this.buys) {
    let foundBuy = await Buy.findById(buy);
    shipping_estimated_kg += foundBuy.total_weight_kg;
  }
  this.shipping_estimated_kg = shipping_estimated_kg;
});

const Importation = mongoose.model("Importation", ImportationSchema);

module.exports = { Importation, ImportationSchema };
