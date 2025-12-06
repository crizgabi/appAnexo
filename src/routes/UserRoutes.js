import express from "express";
import * as UserController from "../controllers/UserController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js"

const router = express.Router();

router.post("/login", UserController.loginUser);
router.post("/refresh", UserController.refreshSession)
router.put("/update-password", AuthMiddleware, UserController.updatePassword);
router.get("/", AuthMiddleware, UserController.showUserDetails);
router.get("/all", AuthMiddleware, UserController.getAllUsers)

export default router;