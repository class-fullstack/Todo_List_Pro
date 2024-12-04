//* LIB
const express = require("express");
const morgan = require("morgan");

//* REQUIRE
const Environment = require("./share/utils/env.utils");
const { NodeEnvStatus, Morgan } = require("./share/constants/app.constants");

const app = express();

// Morgan
app.use(
  morgan(
    Environment.getCurrentEnvValue() === NodeEnvStatus.Development
      ? Morgan.Development
      : Morgan.Production
  )
);
// Body parser
app.use(express.json());

// Routes
const apiRouter = express.Router();
apiRouter.use("/v1", require("./v1/routes"));

app.use("/api", apiRouter);

module.exports = app;
