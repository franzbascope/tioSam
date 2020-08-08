const express = require("express");
const ClientService = require("../services/clients");
const clientsService = new ClientService();

const clientsApi = (app) => {
  const router = express.Router();
  app.use("/clients", router);
  router.get("/", async (req, res, next) => {
    const { tags } = req.query;
    try {
      const clients = await clientsService.get({ tags });
      res.status(200).json(clients);
    } catch (err) {
      next(err);
    }
  });

  router.get("/:clientId", async function (req, res, next) {
    const { clientId } = req.params;
    try {
      const client = await clientsService.edit({ clientId });
      res.status(200).json(client);
    } catch (err) {
      next(err);
    }
  });

  router.post("/", async (req, res, next) => {
    try {
      const client = await clientsService.store({ client: req.body });
      res.status(201).json(client);
    } catch (err) {
      next(err);
    }
  });

  router.delete("/:clientId", async function (req, res, next) {
    const { clientId } = req.params;

    try {
      const deletedClient = await clientsService.delete({
        clientId,
      });

      res.status(200).json(deletedClient);
    } catch (err) {
      next(err);
    }
  });

  router.put("/:clientId", async function (req, res, next) {
    const { clientId } = req.params;

    try {
      const updatedClient = await clientsService.update({
        clientId,
        client: req.body,
      });
      res.status(200).json(updatedClient);
    } catch (err) {
      next(err);
    }
  });
};

module.exports = clientsApi;
