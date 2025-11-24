import { Router } from "express";
import { OSController } from "../controllers/OSController.js";

const router = Router();

router.post("/", OSController.create);
router.get("/", OSController.findAll);
router.get("/:id", OSController.findById);
router.put("/:id", OSController.update);
router.delete("/:id", OSController.delete);

export default router;