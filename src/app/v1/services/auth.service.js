const AuthValidate = require("../../share/validates/auth.validate");
const userModel = require("../models/user.model");
const PasswordUtils = require("../../share/utils/password.utils");
const AuthEntities = require("../../share/entities/auth.entities");
class AuthService {
  async login() {
    return {
      message: "Login successful",
    };
  }

  async register({ email, password }) {
    // B1. Check invalidation for email and password
    const fieldsToCheck = ["email", "password"];
    const invalidFields = AuthValidate.checkFields(
      { email, password },
      fieldsToCheck
    );

    if (invalidFields.length > 0) {
      throw new Error(
        `The following fields are required: ${invalidFields.join(", ")}`
      );
    }
    // B2. Check email format
    if (!AuthValidate.isEmailValid(email)) {
      throw new Error("Email is invalid");
    }

    // B3. Check if the email is already registered
    const isEmailRegistered = await userModel.findOneByEmail({ email });

    // B4. If the email is already registered, throw an error
    if (isEmailRegistered) {
      throw new Error("Email is already registered");
    }

    // B5. Hash the password
    const hashedPassword = PasswordUtils.hash({ password });

    // B6. Save the user to the database
    const user = await userModel.create({ email, password: hashedPassword });

    // B7. Return the user and message
    return {
      user: new AuthEntities({
        userId: user.id,
        email: user.email,
      }),
      message: "Registration successful",
    };
  }
}

module.exports = new AuthService();
