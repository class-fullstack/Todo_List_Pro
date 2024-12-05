const fs = require("fs");
const path = require("path");

class Logger {
  static logError(error) {
    const logFilePath = path.join(__dirname, "../../logs/error.log");
    const logMessage = `${new Date().toISOString()} - Error: ${
      error.message
    }\n${error.stack}\n\n`;
    fs.appendFileSync(logFilePath, logMessage, "utf8");
    console.error(error);
  }
}

module.exports = Logger;
