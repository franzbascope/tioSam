const { Importation } = require("../models/importations");
const Boom = require("boom");
const { addProperties } = require("../models/importation/helperFunctions");

class ImportationsService {
  constructor() {}

  async get() {
    return await Importation.find();
  }
  async store({ importation }) {
    try {
      importation = await addProperties(importation);
      console.log("importation", importation);
      let newImportation = await new Importation(importation).save();
      return newImportation;
    } catch (e) {
      throw Boom.badData(e);
    }
  }

  async delete({ importId }) {
    try {
      return await Importation.findByIdAndDelete(importId);
    } catch (e) {
      throw Boom.notFound(e);
    }
  }

  async edit({ importId }) {
    try {
      return await Importation.findById(importId);
    } catch (e) {
      throw Boom.notFound(e);
    }
  }

  async update({ importId, importation }) {
    const options = { new: true };
    importation = await addProperties(importation)
    try {
      let updatedBuy = await Importation.findByIdAndUpdate(
        importId,
        importation,
        options
      );
      return updatedBuy;
    } catch (e) {
      throw Boom.notFound();
    }
  }
}

module.exports = ImportationsService;
