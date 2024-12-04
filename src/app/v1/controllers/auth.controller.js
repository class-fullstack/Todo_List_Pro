const authService = require("../services/auth.service");

class AuthController {
  async login(_, res) {
    try {
      const result = await authService.login();
      return res.status(201).json(result);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new AuthController();
