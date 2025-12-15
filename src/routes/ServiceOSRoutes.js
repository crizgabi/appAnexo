import express from "express";
import { ServiceOSController } from "../controllers/ServiceOSController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js"

const router = express.Router({ mergeParams: true });


router.post("/servicos", AuthMiddleware, ServiceOSController.create);
router.get("/servicos", AuthMiddleware, ServiceOSController.getAllByOS);
router.delete("/servicos/:idItem", AuthMiddleware, ServiceOSController.delete);

export default router;