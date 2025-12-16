import express from "express";
import { ProductOSController } from "../controllers/ProductOSController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js"

const router = express.Router({ mergeParams: true });

router.post("/produtos", AuthMiddleware, ProductOSController.create);
router.get("/produtos", AuthMiddleware, ProductOSController.getAllByOS);
router.delete("/produtos/:idItem", AuthMiddleware, ProductOSController.delete);

export default router;