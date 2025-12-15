import express from "express";
import * as CalendarController from "../controllers/CalendarController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js"

const router = express.Router();

router.get("/:id", AuthMiddleware, CalendarController.getCalendar);

export default router;
