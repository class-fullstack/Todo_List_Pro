const userModel = require("../models/user.model");
const UserEntities = require("../../share/entities/user.entities");
const TokenUtils = require("../../share/utils/token.utils");
const tokenConfig = require("../../share/configs/token.conf");
const socketService = require("../../share/database/socket-io.database");
const deviceIdModel = require("../models/deviceId.model");

class UserService {
  async getUserById(req) {
    // B1. Get id from userId for token middleware
    const userId = req.userId;
    if (!userId) {
      throw new Error("User id is missing");
    }

    // B2. Get user by id
    const user = await userModel.findOneById({
      id: userId,
    });

    if (!user) {
      throw new Error("User not found");
    }

    // B3. Return user and message
    return {
      user: new UserEntities({
        userId: user.id,
        username: user.username,
        email: user.email,
        isDeleted: user.is_deleted,
        createdAt: user.created_at,
        updatedAt: user.updated_at,
      }),
      message: "Get user successfully",
    };
  }

  async scanQrCode(req) {
    // B1. Get params from req
    const { token } = req;

    // B2. Check token is missing
    if (!token) {
      throw new Error("Token is missing");
    }

    // B3. Parse token take information from token
    const resultInfo = TokenUtils.verifyToken({
      token,
      secret: tokenConfig.EncryptSecret,
    });

    // B4. Check resultInfo is missing
    if (!resultInfo) {
      throw new Error("Token is invalid");
    }

    // B5 Check user have existed
    const user = await userModel.findOneById({
      id: resultInfo.userId,
    });

    if (!user) {
      throw new Error("User not found");
    }

    //B6. Update device with that user
    deviceIdModel.updateUserIdByDeviceId({
      userId: resultInfo.userId,
      deviceId: resultInfo.deviceId,
    });

    // B7. Send socket
    socketService.sendMessage(resultInfo.deviceId, {
      title: "Login QR",
      content: "Login QR successfully ",
    });

    return {
      user: new UserEntities({
        userId: user.id,
        email: user.email,
      }),
      token,
      message: "Scan QR code successfully",
    };
  }
}

module.exports = new UserService();
