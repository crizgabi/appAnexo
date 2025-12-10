import express from "express";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";
import ServiceOrderController from "../controllers/ServiceOrderController.js";

const router = express.Router();

router.post("/", AuthMiddleware, ServiceOrderController.create);
router.get("/", AuthMiddleware, ServiceOrderController.getAll);
router.get("/:id", AuthMiddleware, ServiceOrderController.getById);
router.put("/:id", AuthMiddleware, ServiceOrderController.update);
router.delete("/:id", AuthMiddleware, ServiceOrderController.delete);

export default router;
