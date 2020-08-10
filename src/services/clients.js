const { Client } = require("../models/client");
const Boom = require("boom");

class ClientService {
  constructor() {}

  async get() {
    return await Client.find();
  }
  async edit({ clientId }) {
    try {
      return await Client.findById(clientId);
    } catch (e) {
      throw Boom.notFound(e);
    }
  }
  async store({ client }) {
    let newClient = new Client(client);
    try {
      newClient = await newClient.save();
      return newClient;
    } catch (e) {
      throw Boom.badData(e);
    }
  }
  async update({ clientId, client }) {
    const options = { new: true };
    try {
      let updatedClient = await Client.findByIdAndUpdate(
        clientId,
        client,
        options
      );
      return updatedClient;
    } catch (e) {
      throw Boom.notFound();
    }
  }
  async delete({ clientId }) {
    try {
      return await Client.findByIdAndDelete(clientId);
    } catch (e) {
      throw Boom.notFound(e);
    }
  }
}

module.exports = ClientService;
