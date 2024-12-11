const authConfig = {
  AccessSecret: process.env.REFRESH_TOKEN_SECRET,
  RefreshSecret: process.env.ACCESS_TOKEN_SECRET,
};

module.exports = authConfig;
