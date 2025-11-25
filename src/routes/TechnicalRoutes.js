import { Router } from "express";
import { TecnicoController } from "../controllers/TechnicalController.js";
import authMiddleware from "../middlewares/authMiddleware.js"

const router = Router();

router.get("/", authMiddleware, TecnicoController.getAll);
// router.get("/:id", TecnicoController.getById);

export default router;
