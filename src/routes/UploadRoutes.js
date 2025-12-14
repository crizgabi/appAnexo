import express from "express";
import multer from "multer";
import { UploadController } from "../controllers/UploadController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", AuthMiddleware, upload.single("file"), UploadController.upload);

export default router;