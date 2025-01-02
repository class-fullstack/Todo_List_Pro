const express = require("express");
const deviceIdController = require("../../controllers/deviceId.controller");
const router = express.Router();

router.get("/generate-device-id", deviceIdController.generateDeviceId);

module.exports = router;
