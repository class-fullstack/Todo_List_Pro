const deviceIdModel = require("../models/deviceId.model");

class DeviceMiddleware {
  static async validateDevice(req, res, next) {
    // B1. Get device from header
    const deviceId = req.headers["device-id"];

    // B2. Check if device is missing
    if (!deviceId) {
      return res.status(400).json({ message: "Device is missing" });
    }

    // B3. Check if the device ID is already registered
    const isDeviceIdRegistered = await deviceIdModel.findOneByDeviceId({
      deviceId,
    });

    if (!isDeviceIdRegistered) {
      throw new Error("Device ID is not registered");
    }

    // B4. Set device to req and call next
    req.deviceId = deviceId;
    next();
  }
}

module.exports = DeviceMiddleware;
