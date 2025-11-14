import express from "express";
import * as CustomerAppOsController from "../controllers/CustomerAppOsController.js";
import authMiddleware from "../../src/middlewares/authMiddleware.js"
import Customer from "../../src/models/CustomerModel.js";

const router = express.Router();

router.get("/:id", authMiddleware, CustomerAppOsController.getCustomer);
router.get("", authMiddleware, CustomerAppOsController.getCustomersByName)
router.post("/", authMiddleware, CustomerAppOsController.createCustomer)
router.put("/:id", authMiddleware, CustomerAppOsController.updateCustomer)

export default router;
