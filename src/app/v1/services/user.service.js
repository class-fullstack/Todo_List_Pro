const userModel = require("../models/user.model");
const UserEntities = require("../../share/entities/user.entities");

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

    return {
      token,
      message: "Scan QR code successfully",
    };
  }
}

module.exports = new UserService();
