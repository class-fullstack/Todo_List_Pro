const appConstants = {
  Port: process.env.PORT || 5000,

  NodeEnv: {
    Development: process.env.NODE_ENV || "development",
  },

  NodeEnvStatus: {
    Development: 0,
    Staging: 1,
    Production: 2,
  },

  Morgan: {
    Development: "dev",
    Production: "combined",
  },
};

module.exports = appConstants;
