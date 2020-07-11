const { Importation } = require("../models/importations");
const Boom = require("boom");

class ImportationsService {
  constructor() {}

  get() {
    return Importation.find();
  }
  async store({ importation }) {
    try {
      let newImportation = await new Importation(importation).save();
      return newImportation;
    } catch (e) {
      throw Boom.badData(e);
    }
  }
}

module.exports = ImportationsService;
