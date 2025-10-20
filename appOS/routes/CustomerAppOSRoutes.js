import express from "express";
import * as CustomerAppOsController from "../controller/CustomerAppOsController.js";
import authMiddleware from "../../src/middleware/authMiddleware.js"

const router = express.Router();

router.get("/customer-details", authMiddleware, CustomerAppOsController.getCustomer);

export default router;
