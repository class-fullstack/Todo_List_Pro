const express = require("express");
const authController = require("../../controllers/auth.controller");
const router = express.Router();

router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/forget-password", authController.forgetPassword);

module.exports = router;
