import express from "express";
import * as CustomerController from "../controllers/CustomerController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js"

const router = express.Router();

router.get("/:id", AuthMiddleware, CustomerController.getCustomer);
router.get("", AuthMiddleware, CustomerController.getCustomersByName)
router.post("/", AuthMiddleware, CustomerController.createCustomer)
router.put("/:id", AuthMiddleware, CustomerController.updateCustomer)

export default router;
