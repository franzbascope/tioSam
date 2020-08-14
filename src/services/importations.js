const { Importation } = require("../models/importations");
const Boom = require("boom");
const { addProperties } = require("../models/importation/helperFunctions");
const { paginateModel } = require("./functions/pagination");

class ImportationsService {
  constructor() {}

  async get(req) {
    const { pageNum } = req.params;
    const num = Number(pageNum);
    return await paginateModel({
      model: Importation,
      query: Importation.find().populate("storage"),
      page: num,
    });
  }
  async store({ importation }) {
    try {
      importation = await addProperties(importation);
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
      return await Importation.findById(importId).populate("storage");
    } catch (e) {
      throw Boom.notFound(e);
    }
  }

  async update({ importId, importation }) {
    const options = { new: true };
    importation = await addProperties(importation);
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
