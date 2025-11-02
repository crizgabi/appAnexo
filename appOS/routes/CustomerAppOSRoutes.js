import express from "express";
import * as CustomerAppOsController from "../controller/CustomerAppOsController.js";
import authMiddleware from "../../src/middleware/authMiddleware.js"
import Customer from "../../src/models/CustomerModel.js";

const router = express.Router();

router.get("/customer-details/:id", authMiddleware, CustomerAppOsController.getCustomer);
router.get("/list-customers", authMiddleware, CustomerAppOsController.getCustomersByName)
router.post("/create-customer", authMiddleware, CustomerAppOsController.createCustomer)
router.patch("/update-customer/:id", authMiddleware, CustomerAppOsController.updateCustomer)

export default router;
