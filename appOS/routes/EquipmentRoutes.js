import express from "express";
import { EquipmentController } from   "../controller/EquipmentController.js";
import authMiddleware from "../../src/middleware/authMiddleware.js"

const router = express.Router();

router.get("/", authMiddleware, EquipmentController.getAll);
router.get("/customer/:idCliente", authMiddleware, EquipmentController.getByCustomerId);
router.get("/:id", authMiddleware, EquipmentController.getById);
router.post("/", authMiddleware, EquipmentController.create);
router.put("/:id", authMiddleware, EquipmentController.update);
router.delete("/:id", authMiddleware, EquipmentController.delete);

export default router;
