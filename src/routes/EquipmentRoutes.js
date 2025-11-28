import express from "express";
import { EquipmentController } from   "../controllers/EquipmentController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js"

const router = express.Router();

router.get("/", AuthMiddleware, EquipmentController.getAll);
router.get("/customer/:idCliente", AuthMiddleware, EquipmentController.getByCustomerId);
router.get("/:id", AuthMiddleware, EquipmentController.getById);
router.post("/", AuthMiddleware, EquipmentController.create);
router.put("/:id", AuthMiddleware, EquipmentController.update);
router.delete("/:id", AuthMiddleware, EquipmentController.delete);

export default router;
