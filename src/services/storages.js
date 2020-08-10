const { Storage } = require("../models/storage");
const Boom = require("boom");

class StorageService {
  constructor() {}

  async get() {
    return await Storage.find().populate("ProductStorage");
  }
  async edit({ storageId }) {
    try {
      return await Storage.findById(storageId).populate("ProductStorage");
    } catch (e) {
      throw Boom.notFound(e);
    }
  }
}

module.exports = StorageService;
