const express = require("express");
const DeviceMiddleware = require("../middleware/device.middleware");
const router = express.Router();

router.use("/device", require("./device"));

router.use(DeviceMiddleware.validateDevice);
router.use("/auth", require("./auth"));
router.use("/users", require("./users"));

module.exports = router;
