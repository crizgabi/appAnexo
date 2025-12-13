import express from "express";
import { ItemServiceOrderController } from "../controllers/ItemServiceOrderController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js"

const router = express.Router({ mergeParams: true });


router.post("/produtos", AuthMiddleware, ItemServiceOrderController.create);
router.get("/produtos", AuthMiddleware, ItemServiceOrderController.getAllByOS);
router.delete("/produtos/:idItem", AuthMiddleware, ItemServiceOrderController.delete);

export default router;