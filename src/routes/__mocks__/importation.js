const importation = {
  departure_date: "2020-01-01",
  arrival_date: "2020-01-02",
  state:"USA",
  value_dollars:123,
  value_bs: {
    type: Number,
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
  },
  buys: [{ type: Schema.Types.ObjectId, ref: "Buy" }],
};

module.exports = { importation };
