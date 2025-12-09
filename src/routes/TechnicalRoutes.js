import express from "express";
import { TechnicalController } from "../controllers/TechnicalController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";

const router = express.Router();

console.log("TechnicalRoutes.js carregado!");
router.get("/", AuthMiddleware, TechnicalController.getAll);

export default router;