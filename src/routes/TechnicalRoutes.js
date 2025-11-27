import express from "express";
import { TechnicalController } from "../controllers/TechnicalController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

console.log("TechnicalRoutes.js carregado!");
router.get("/", authMiddleware, TechnicalController.getAll);

export default router;