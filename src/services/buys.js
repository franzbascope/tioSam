const { Buy } = require("../models/buys");
const Boom = require("boom");

class SellsService {
  constructor() {}

  get() {
    return Buy.find();
  }
  async store({ buy }) {
    try {
      let newBuy = await new Buy(buy).save();
      return newBuy;
    } catch (e) {
      throw Boom.badData(e);
    }
  }
}

module.exports = SellsService;
