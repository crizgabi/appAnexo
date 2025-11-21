import express from "express";
import * as ServicesController from "../controllers/ServicesController.js";
import authMiddleware from "../middlewares/authMiddleware.js"

const router = express.Router();

router.get("", authMiddleware, ServicesController.getServices);
router.get("/:serviceId", authMiddleware, ServicesController.getServiceDetails);

export default router;
