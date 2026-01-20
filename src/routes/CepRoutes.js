import express from "express";
import * as CepController from "../controllers/CepController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";

const router = express.Router();

router.get("/:cep", AuthMiddleware, CepController.getAddressByCep);
router.get("/:cep/code", AuthMiddleware, CepController.getCityCode);

export default router;