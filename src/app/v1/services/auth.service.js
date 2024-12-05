const AuthValidate = require("../../share/validates/auth.validate");
const userModel = require("../models/user.model");
const PasswordUtils = require("../../share/utils/password.utils");
class AuthService {
  async login() {
    return {
      message: "Login successful",
    };
  }

  async register({ email, password }) {
    // B1. Check invalidation for email and password
    if (AuthValidate.isFieldEmpty({ email, password })) {
      throw new Error("Email and password are required");
    }
    // B2. Check email format
    if (!AuthValidate.isEmailValid(email)) {
      throw new Error("Email is invalid");
    }

    // B3. Check if the email is already registered
    const isEmailRegistered = userModel.findOneByEmail({ email });

    // B4. If the email is already registered, throw an error
    if (isEmailRegistered) {
      throw new Error("Email is already registered");
    }

    // B5. Hash the password
    const hashedPassword = PasswordUtils.hash({ password });

    // B6. Save the user to the database
    const user = userModel.create({ email, password: hashedPassword });

    // B7. Return the user and message
    return {
      user,
      message: "Registration successful",
    };
  }
}

module.exports = new AuthService();
