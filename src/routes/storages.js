const express = require("express");
const StorageService = require("../services/storages");
const storageService = new StorageService();

function apiStorages(app) {
    const router = express.Router();
    app.use("/storages", router);
    router.get("/", async (req, res, next) =>{
        const { tags } = req.query;

        try {
            const storages = await storageService.get({tags});
            res.status(200).json(storages);    
        } catch (erro) {
            next(err);
        }
    });
}

module.exports = apiStorages;