const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const rolesMiddleware = require("../middleware/rolesMiddleware");

router.post("/", userController.createUser)
router.get("/", authMiddleware, rolesMiddleware("user"), userController.listUsers);
router.post("/login", userController.loginUser);
router.put("/update-password", authMiddleware, userController.updatePassword);

module.exports = router;