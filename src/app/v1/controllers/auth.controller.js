const authService = require("../services/auth.service");

class AuthController {
  async login(_, res) {
    try {
      const result = await authService.login();
      return res.status(201).json(result);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async register(req, res) {
    try {
      const result = await authService.register(req.body);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

module.exports = new AuthController();
