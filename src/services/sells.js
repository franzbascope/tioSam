const { Sell } = require("../models/sell");
const Boom = require("boom");

class SellsService {
  constructor() {}

  async get() {
    return await Sell.find();
  }
  async edit({ sellId }) {
    try {
      return await Sell.findById(sellId);
    } catch (e) {
      throw Boom.notFound(e);
    }
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
  async update({ sellId, sell }) {
    const options = { new: true };
    try {
      let updatedSell = await Sell.findByIdAndUpdate(sellId, sell, options);
      return updatedSell;
    } catch (e) {
      throw Boom.notFound();
    }
  }
  async delete({ sellId }) {
    try {
      return await Sell.findByIdAndDelete(sellId);
    } catch (e) {
      throw Boom.notFound(e);
    }
  }
}

module.exports = SellsService;
