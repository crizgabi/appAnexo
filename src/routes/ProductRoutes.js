import express from "express";
import * as ProductController from "../controllers/ProductController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";

const router = express.Router();

router.get("", AuthMiddleware, ProductController.getProducts);
router.get("/:productId", AuthMiddleware, ProductController.getProductDetails);

export default router;