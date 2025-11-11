import express from "express";
import { EquipamentController } from   "../controllers/EquipmentController.js";
import authMiddleware from "../middleware/authMiddleware.js"

const router = express.Router();

router.get("/", authMiddleware, EquipamentController.getAll);
router.get("/customer/:idCliente", authMiddleware, EquipamentController.getByCustomerId);
router.get("/:id", authMiddleware, EquipamentController.getById);
router.post("/", authMiddleware, EquipamentController.create);
router.put("/:id", authMiddleware, EquipamentController.update);
router.delete("/:id", authMiddleware, EquipamentController.delete);

export default router;
