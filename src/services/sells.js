const productsMock = require("../utils/mocks/products");
const { Sell } = require("../models/sell");
const Boom = require("boom");

class SellsService {
  constructor() {}

  get() {
    return Sell.find();
  }
  async store({ sell }) {
    try {
      let newSell = new Sell(sell);
      newSell = await newSell.save();
      return newSell;
    } catch (e) {
      throw Boom.badData(e);
    }
  }
}

module.exports = SellsService;
