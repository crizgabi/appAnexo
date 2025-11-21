import express from "express";
import * as CustomerController from "../controllers/CustomerController.js";
import authMiddleware from "../middlewares/authMiddleware.js"

const router = express.Router();

router.get("/:id", authMiddleware, CustomerController.getCustomer);
router.get("", authMiddleware, CustomerController.getCustomersByName)
router.post("/", authMiddleware, CustomerController.createCustomer)
router.put("/:id", authMiddleware, CustomerController.updateCustomer)

export default router;
