class Logger {
  static logError(error) {
    console.error(error);
    throw new Error("An error occurred. Please try again later.");
  }
}

module.exports = Logger;
