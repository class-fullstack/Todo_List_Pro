const express = require("express");
const authController = require("../../controllers/auth.controller");
const router = express.Router();

router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/forget-password", authController.forgetPassword);
router.post("/logout", authController.logout);
router.post("/generate-qr-code", authController.generateQRCode);

module.exports = router;
