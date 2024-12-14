const authService = require("../services/auth.service");

class AuthController {
  async login(req, res) {
    try {
      const result = await authService.login(req.body, res);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async register(req, res) {
    try {
      const result = await authService.register(req.body);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async forgetPassword(req, res) {
    try {
      const result = await authService.forgetPassword(req.body);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async logout(_, res) {
    try {
      const result = await authService.logout(res);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new AuthController();
