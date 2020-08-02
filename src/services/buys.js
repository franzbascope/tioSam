const { Buy } = require("../models/buys");
const Boom = require("boom");

class SellsService {
  constructor() { }

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
  async delete({ buyId }) {
    try {
      return await Buy.findByIdAndDelete(buyId);
    } catch (e) {
      throw Boom.notFound(e);
    }
  }

  async edit({ buyId }) {
    try {
      return await Buy.findById(buyId);
    } catch (e) {
      throw Boom.notFound(e);
    }
  }
}

module.exports = SellsService;
