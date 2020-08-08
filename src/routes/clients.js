const express = require("express");
const clientService = require("../services/clients");
const productsService = new ProductsService();

const clientsApi = (app) => {
  const router = express.Router();
  app.use("/clients", router);
  router.get("/", async (req, res, next) => {
    const { tags } = req.query;
    try {
      const clients = await clientService.get({ tags });
      res.status(200).json(clients);
    } catch (err) {
      next(err);
    }
  });

  router.get("/:clientId", async function (req, res, next) {
    const { clientId } = req.params;
    try {
      const client = await clientService.edit({ clientId });
      res.status(200).json(client);
    } catch (err) {
      next(err);
    }
  });

  router.post("/", async (req, res, next) => {
    try {
      const client = await clientService.store({ client: req.body });
      res.status(201).json(client);
    } catch (err) {
      next(err);
    }
  });

  router.delete("/:clientId", async function (req, res, next) {
    const { clientId } = req.params;

    try {
      const deletedClient = await clientService.delete({
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
      const updatedClient = await productsService.update({
        clientId,
        client: req.body,
      });
      res.status(200).json(updatedClient);
    } catch (err) {
      next(err);
    }
  });
};

module.exports = productsApi;
