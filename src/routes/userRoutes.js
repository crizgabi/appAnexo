import express from "express";
import * as userController from "../controllers/userController.js";

const router = express.Router();

router.post("/", userController.createUser);
router.get("/", userController.listUsers);
router.post("/login", userController.loginUser);
router.put("/update-password", userController.updatePassword);

export default router;