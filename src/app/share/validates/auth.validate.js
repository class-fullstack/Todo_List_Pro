const _ = require("lodash");

class AuthValidate {
  static isFieldEmpty(obj, field) {
    if (!_.isObject(obj)) {
      throw new Error("Invalid input: object and fields array are required.");
    }

    // Retrieve the field value
    const value = _.get(obj, field);

    // Check if the value is null, undefined, or empty
    return _.isNil(value) || _.isEmpty(value);
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
