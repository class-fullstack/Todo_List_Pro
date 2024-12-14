const AuthConstants = require("../../share/constants/auth.constants");
const TokenUtils = require("../../share/utils/token.utils");
const tokenConfig = require("../../share/configs/token.conf");
const authConstants = require("../../share/constants/auth.constants");

class AuthMiddleware {
  static checkToken(req, res, next) {
    // B1. Get accessToken from header
    const accessToken = TokenUtils.removeBearerPrefix(
      req.headers["authorization"]
    );
    if (!accessToken) {
      return res.status(401).json({ message: "Access token is missing" });
    }

    // B2 Get Refresh token from Cookie
    const refreshToken = req.cookies[AuthConstants.KeyCookie.RefreshToken];
    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token is missing" });
    }

    try {
      // B3. Verify accessToken
      const infoUserByToken = TokenUtils.verifyToken({
        token: accessToken,
        secret: tokenConfig.AccessSecret,
      });

      if (!infoUserByToken) {
        return res.status(401).json({ message: "Invalid access token" });
      }

      // B4. Set userId to req and call next
      req.userId = infoUserByToken.userId;
      next();
    } catch (error) {
      // B5. Check if the error is TokenExpiredError
      if (error.name === authConstants.JwtMessage.TokenExpiredError) {
        return res.status(401).json({ message: "Access token has expired" });
      } else {
        // B6. If the error is not TokenExpiredError
        return res.status(401).json({ message: "Invalid access token" });
      }
    }
  }
}

module.exports = AuthMiddleware;
