import express from "express";
import * as userController from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js"

const router = express.Router();

// router.get("/", authMiddleware, rolesMiddleware(Roles.USER), userController.listUsers);
router.post("/login", userController.loginUser);
router.post("/refresh", userController.refreshSession)
router.put("/update-password", authMiddleware, userController.updatePassword);
router.get("/user-details", authMiddleware, userController.showUserDetails);

export default router;