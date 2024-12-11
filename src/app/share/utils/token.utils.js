const jwt = require("jsonwebtoken");

class TokenUtils {
  static generateAccessToken({ payload, secret, expiresIn = "1h" }) {
    return jwt.sign(payload, secret, { expiresIn });
  }

  static generateRefreshToken({ payload, secret, expiresIn = "7d" }) {
    return jwt.sign(payload, secret, { expiresIn });
  }

  static verifyToken({ token, secret }) {
    try {
      return jwt.verify(token, secret);
    } catch (error) {
      throw new Error("Invalid token");
    }
  }
}

module.exports = TokenUtils;
