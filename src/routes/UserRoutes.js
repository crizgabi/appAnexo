import express from "express";
import * as userController from "../controllers/UserController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js"

const router = express.Router();

router.post("/login", userController.loginUser);
router.post("/refresh", userController.refreshSession)
router.put("/update-password", AuthMiddleware, userController.updatePassword);
router.get("/", AuthMiddleware, userController.showUserDetails);

export default router;