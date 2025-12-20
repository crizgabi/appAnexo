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
router.get("/technician/:id", AuthMiddleware, ServiceOrderController.getByUser);
router.get("/:id/assinatura", AuthMiddleware, ServiceOrderController.getSignature);
router.put("/:id/assinatura", AuthMiddleware, uploadFields, ServiceOrderController.addSignature);
router.delete("/:id/assinatura/:tipo", AuthMiddleware, ServiceOrderController.deleteSignature);
router.get("/:id", AuthMiddleware, ServiceOrderController.getById);
router.put("/:id", AuthMiddleware, ServiceOrderController.update);
router.delete("/:id", AuthMiddleware, ServiceOrderController.delete);
router.get("/:id/images", AuthMiddleware, ServiceOrderController.getImages);
router.post("/:id/image", AuthMiddleware,  upload.single("image"), ServiceOrderController.addImage);
router.get("/:id/images/:imageId", AuthMiddleware, ServiceOrderController.getImageById);
router.delete("/:id/images/:imageId", AuthMiddleware, ServiceOrderController.deleteImage);
router.patch("/:id/images/:imageId/description", AuthMiddleware, ServiceOrderController.updateImageDescription);
router.post("/:id/checkin", AuthMiddleware, ServiceOrderController.checkIn);
router.post("/:id/checkout", AuthMiddleware, ServiceOrderController.checkOut);

export default router;