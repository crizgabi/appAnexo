import express from "express";
import * as userController from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js"

const router = express.Router();

router.post("/login", userController.loginUser);
router.post("/refresh", userController.refreshSession)
router.put("/update-password", authMiddleware, userController.updatePassword);
router.get("/", authMiddleware, userController.showUserDetails);

export default router;