const _ = require("lodash");

class AuthValidate {
  static isFieldEmpty(obj, field) {
    if (typeof obj !== "object" || obj === null) {
      throw new Error("Input is not a valid object.");
    }

    const value = obj[field];
    return value === null || value === undefined || value === "";
  }

  static checkFields(obj, fields) {
    if (typeof obj !== "object" || obj === null || !Array.isArray(fields)) {
      throw new Error("Invalid input: object and fields array are required.");
    }

    const invalidFields = fields.filter((field) =>
      this.isFieldEmpty(obj, field)
    );
    return invalidFields;
  }

  static isEmailValid(email) {
    if (!_.isString(email)) {
      throw new Error("Invalid input: email is required.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email);
  }
}

module.exports = AuthValidate;
