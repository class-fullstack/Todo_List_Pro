const authConstants = {
  LoginType: {
    Email: 10,
    Username: 20,
  },
  JwtTime: {
    AccessToken: "15m",
    RefreshToken: "7d",
    QrCode: "1d",
  },

  JwtMessage: {
    TokenExpiredError: "TokenExpiredError",
  },

  KeyCookie: {
    RefreshToken: "auth_refresh_token",
  },
};

module.exports = authConstants;
