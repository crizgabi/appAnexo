import express from "express";
import * as CatalogController from "../controllers/CatalogController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js"

const router = express.Router();

router.get("/", AuthMiddleware, CatalogController.getCatalog);

export default router;
