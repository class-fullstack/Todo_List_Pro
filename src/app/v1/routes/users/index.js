const express = require("express");
const userController = require("../../controllers/user.controller");
const AuthMiddleware = require("../../middleware/auth.middleware");
const router = express.Router();

// Check token middleware
router.use(AuthMiddleware.checkToken);

router.get("/scan-qr-code", userController.scanQrCode);

router.get("/:id", userController.getProfile);

module.exports = router;
