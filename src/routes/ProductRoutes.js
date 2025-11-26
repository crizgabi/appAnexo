import express from "express";
import * as ProductController from "../controllers/ProductController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("", authMiddleware, ProductController.getProducts);
router.get("/:productId", authMiddleware, ProductController.getProductDetails);

export default router;