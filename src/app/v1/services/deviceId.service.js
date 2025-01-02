const DeviceIdUtils = require("../../share/utils/deviceId.utils");
const deviceIdModel = require("../models/deviceId.model");

class DeviceIdService {
  async generateDeviceId() {
    // B1. Generate a random device ID
    const deviceId = await DeviceIdUtils.generateDeviceId();

    // B2. Check if the device ID is already registerer then nothing, not exit save to database
    await deviceIdModel.upsertDeviceId({
      deviceId,
    });
    return {
      deviceId,
      message: "Device ID generated successfully",
    };
  }
}

module.exports = new DeviceIdService();
