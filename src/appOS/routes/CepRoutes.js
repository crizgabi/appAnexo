import express from "express";
import * as CepController from "../controller/CepController.js";
import authMiddleware from "../../middleware/authMiddleware.js";

const router = express.Router();

// GET /cep/92930552
router.get("/:cep", authMiddleware, CepController.getAddressByCep);
router.get("/:cep/code", authMiddleware, CepController.getCityCode);

export default router;