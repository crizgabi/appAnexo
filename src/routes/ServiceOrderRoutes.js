import express from "express";
import multer from "multer";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";
import ServiceOrderController from "../controllers/ServiceOrderController.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

const uploadFields = upload.fields([
    { name: "assinatura1", maxCount: 1 },
    { name: "assinatura2", maxCount: 1 },
]);

router.post("/", AuthMiddleware, ServiceOrderController.create);
router.get("/", AuthMiddleware, ServiceOrderController.getAll);
router.get("/:id", AuthMiddleware, ServiceOrderController.getById);
router.put("/:id", AuthMiddleware, uploadFields, ServiceOrderController.update);
router.delete("/:id", AuthMiddleware, ServiceOrderController.delete);

export default router;
