import express from "express";
import * as userController from "../controllers/userController.js";

const router = express.Router();

router.post("/users", userController.createUser);
router.get("/users", userController.listUsers);
router.post("/login", userController.loginUser);
router.put("/users/update-password", userController.updatePassword);

export default router;