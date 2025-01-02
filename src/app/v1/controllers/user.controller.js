const userService = require("../services/user.service");

class UserController {
  async getProfile(req, res) {
    try {
      const result = await userService.getUserById(req);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async scanQrCode(req, res) {
    try {
      const result = await userService.scanQrCode(req.query);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new UserController();
