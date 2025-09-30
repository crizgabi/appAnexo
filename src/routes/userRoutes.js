import express from "express";
import * as userController from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js"
import rolesMiddleware from "../middleware/rolesMiddleware.js"
import Roles from "../models/roles.js"

const router = express.Router();

router.post("/", userController.createUser);
router.get("/", authMiddleware, rolesMiddleware(Roles.USER), userController.listUsers);
router.post("/login", userController.loginUser);
router.put("/update-password", authMiddleware, userController.updatePassword);

export default router;