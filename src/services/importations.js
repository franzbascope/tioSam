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
}

module.exports = ImportationsService;
