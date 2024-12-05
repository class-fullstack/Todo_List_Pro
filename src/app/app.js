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

// Connect to the database, Cache,...
require("./share/database/pg.database").connect();

// Routes
const apiRouter = express.Router();
apiRouter.use("/v1", require("./v1/routes"));

app.use("/api", apiRouter);

// Error handler
// Not Found Handler (404)
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.statusCode = 404;
  next(error);
});

// General Error Handler
app.use((error, __, res, ____) => {
  // Send an appropriate response to the client
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal Server Error";

  return res.status(statusCode).json({
    message,
    ...(statusCode > 500 && { errorDetails: error.stack }), // Include stack trace only for 500 errors
  });
});

module.exports = app;
