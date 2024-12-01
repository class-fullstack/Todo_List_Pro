const appConstants = require("../constants/app.constants");

class Environment {
  static getCurrentEnvValue() {
    const env = appConstants.NodeEnv.Development;
    const currentEnvValue = appConstants.NodeEnvStatus[env] ?? 0;
    return currentEnvValue;
  }
}

module.exports = Environment;
