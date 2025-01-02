const deviceIdService = require("../services/deviceId.service");

class DeviceIdController {
  async generateDeviceId(_, res) {
    try {
      const result = await deviceIdService.generateDeviceId();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new DeviceIdController();
