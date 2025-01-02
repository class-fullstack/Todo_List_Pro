const jwt = require("jsonwebtoken");
const authConstants = require("../constants/auth.constants");

class TokenUtils {
  static generateAccessToken({
    payload,
    secret,
    expiresIn = authConstants.JwtTime.AccessToken,
  }) {
    return jwt.sign(payload, secret, { expiresIn });
  }

  static generateRefreshToken({
    payload,
    secret,
    expiresIn = authConstants.JwtTime.RefreshToken,
  }) {
    return jwt.sign(payload, secret, { expiresIn });
  }

  static generateToken({ payload, secret, expiresIn }) {
    return jwt.sign(payload, secret, { expiresIn });
  }

  static verifyToken({ token, secret }) {
    try {
      return jwt.verify(token, secret);
    } catch (error) {
      throw error;
    }
  }

  static removeBearerPrefix(token) {
    if (token.startsWith("Bearer ")) {
      return token.replace("Bearer ", "");
    }
    return token;
  }
}

module.exports = TokenUtils;
