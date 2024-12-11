const _ = require("lodash");
const authConstants = require("../constants/auth.contants");

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

  static isPasswordValid(password) {
    if (typeof password !== "string") {
      throw new Error("Invalid input: password is required.");
    }

    // Password must be more than 6 characters long
    if (password.length <= 6) {
      return false;
    }

    // Password must start with a capital letter
    if (!/^[A-Z]/.test(password)) {
      return false;
    }

    // Password must contain at least one number
    if (!/\d/.test(password)) {
      return false;
    }

    // Password must contain at least one special character
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return false;
    }

    return true;
  }

  static checkEmailOrUsername(input) {
    if (typeof input !== "string") {
      throw new Error("Invalid input: input is required.");
    }

    if (this.isEmailValid(input)) {
      return authConstants.LoginType.Email;
    } else {
      return authConstants.LoginType.Username;
    }
  }
}

module.exports = AuthValidate;
