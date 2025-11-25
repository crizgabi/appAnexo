import { Router } from "express";
import { TecnicoController } from "../controllers/TechnicalController.js";

const router = Router();

router.get("/", TecnicoController.getAll);
// router.get("/:id", TecnicoController.getById);

export default router;
