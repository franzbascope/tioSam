const { Buy } = require("../models/buys");
const Boom = require("boom");
const { addProperties } = require('../models/buys/calculatedFunctions')

class SellsService {
  constructor() { }

  async get() {
    return Buy.find();
  }
  async store({ buy }) {
    try {
      buy = addProperties(buy)
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

  async update({ buyId, buy }) {
    const options = { new: true };
    buy = addProperties(buy)
    try {
      let updatedBuy = await Buy.findByIdAndUpdate(
        buyId,
        buy,
        options
      );
      return updatedBuy;
    } catch (e) {
      throw Boom.notFound();
    }
  }
}

module.exports = SellsService;
