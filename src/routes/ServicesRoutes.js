import express from "express";
import * as ServicesController from "../controllers/ServicesController.js";
import AauthMiddleware from "../middlewares/AuthMiddleware.js"

const router = express.Router();

router.get("", AauthMiddleware, ServicesController.getServices);
router.get("/:serviceId", AauthMiddleware, ServicesController.getServiceDetails);

export default router;
