import express from "express";
import multer from "multer";
import { UploadController } from "../controllers/UploadController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

const uploadFields = upload.fields([
    { name: "assinatura1", maxCount: 1 },
    { name: "assinatura2", maxCount: 1 },
]);

router.post("/", AuthMiddleware, uploadFields, UploadController.upload);

export default router;