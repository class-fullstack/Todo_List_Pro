const { NodeEnvStatus } = require("../constants/app.constants");
const Environment = require("../utils/env.utils");

const pgConfig = {
  Host:
    Environment.getCurrentEnvValue() === NodeEnvStatus.Development
      ? process.env.POSTGRES_HOST_LOCAL
      : process.env.POSTGRES_HOST_CONTAINER,
  Port: process.env.POSTGRES_PORT,
  User: process.env.POSTGRES_USER,
  Password: process.env.POSTGRES_PASSWORD,
  Database: process.env.POSTGRES_DB,
};

module.exports = { pgConfig };
