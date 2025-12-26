import { Router } from "express";
import { ServiceOrderHourlyController } from "../controllers/ServiceOrderHourlyController.js";
import  authMiddleware  from "../middlewares/authMiddleware.js";

const router = Router({ mergeParams: true });

router.get("/horarios", authMiddleware, ServiceOrderHourlyController.listByServiceOrder);
router.post("/horarios", authMiddleware, ServiceOrderHourlyController.create);
router.delete("/horarios/:horarioId", authMiddleware, ServiceOrderHourlyController.delete);

export default router;
