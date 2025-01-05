const appConstants = require("../constants/app.constants");

const appConfig = {
  Port: process.env.PORT || appConstants.Port,
  NodeEnv: appConstants.NodeEnv,
  BaseUrl: process.env.BASE_URL,
};

module.exports = appConfig;
