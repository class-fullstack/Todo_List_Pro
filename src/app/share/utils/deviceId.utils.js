const crypto = require("crypto");

class DeviceIdUtils {
  static async generateDeviceId() {
    const randomString = crypto.randomBytes(6).toString("hex");
    return randomString;
  }
}

module.exports = DeviceIdUtils;
