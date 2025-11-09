import express from "express";
import { EquipamentController } from "../controllers/EquipamentController.js";

const router = express.Router();

router.post("/", EquipamentController.create);
router.get("/", EquipamentController.getAll);
router.get("/cliente/:idCliente", EquipamentController.getByCustomer);
router.get("/:id", EquipamentController.getById);
router.put("/:id", EquipamentController.update);
router.delete("/:id", EquipamentController.delete);

export default router;
