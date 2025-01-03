const DeviceIdUtils = require("../../share/utils/deviceId.utils");
const AuthValidate = require("../../share/validates/auth.validate");
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

  async updateUserIdByDeviceId({ deviceId, userId }) {
    // B1. check if the device ID and user ID valid
    const fieldsToCheck = ["userId", "deviceId"];
    const invalidFields = AuthValidate.checkFields(
      { userId, deviceId },
      fieldsToCheck
    );
    if (invalidFields.length > 0) {
      throw new Error(
        `The following fields are required: ${invalidFields.join(", ")}`
      );
    }

    // B2. Check if the device ID is already registered
    const isDeviceIdRegistered = await deviceIdModel.findOneByDeviceId({
      deviceId,
    });

    if (!isDeviceIdRegistered) {
      throw new Error("Device ID is not registered");
    }

    // B3. Update the user ID by device ID
    deviceIdModel.updateUserIdByDeviceId({
      deviceId,
      userId,
    });

    return {
      message: "User ID updated successfully",
    };
  }
}

module.exports = new DeviceIdService();
