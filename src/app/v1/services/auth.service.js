const AuthValidate = require("../../share/validates/auth.validate");
const userModel = require("../models/user.model");
const PasswordUtils = require("../../share/utils/password.utils");
const AuthEntities = require("../../share/entities/auth.entities");
const authConstants = require("../../share/constants/auth.contants");
const TokenUtils = require("../../share/utils/token.utils");
const authConfig = require("../../share/configs/auth.conf");
const appConfig = require("../../share/configs/app.conf");
const appConstants = require("../../share/constants/app.constants");
class AuthService {
  async login({ identify, password }, res) {
    // B1. Check invalidation for identify and password
    const fieldsToCheck = ["identify", "password"];

    const invalidFields = AuthValidate.checkFields(
      { identify, password },
      fieldsToCheck
    );

    if (invalidFields.length > 0) {
      throw new Error(
        `The following fields are required: ${invalidFields.join(", ")}`
      );
    }

    const isPassword = AuthValidate.isPasswordValid(password);
    if (!isPassword) {
      throw new Error("Password is invalid");
    }

    // B2. Check invalidation for identify and password
    const typeLogin = AuthValidate.checkEmailOrUsername(identify);

    let user;
    switch (typeLogin) {
      case authConstants.LoginType.Email:
        user = await userModel.findOneByEmail({ email: identify });
        break;
      case authConstants.LoginType.Username:
        user = await userModel.findOneByUsername({ username: identify });
        break;
      default:
        throw new Error("Invalid login type");
    }

    // B3. Check if user exists and password is correct
    if (!user) {
      throw new Error("User not found");
    }

    // B4. Check if the password is correct
    const isPasswordMatch = PasswordUtils.compare({
      password,
      hash: user.password_hash,
    });

    if (!isPasswordMatch) {
      throw new Error("Password is incorrect");
    }

    // B5. Create a access and refresh token
    const accessToken = TokenUtils.generateAccessToken({
      payload: { userId: user.id },
      secret: authConfig.AccessSecret,
      expiresIn: authConstants.JwtTime.AccessToken,
    });

    const refreshToken = TokenUtils.generateRefreshToken({
      payload: { userId: user.id },
      secret: authConfig.RefreshSecret,
      expiresIn: authConstants.JwtTime.RefreshToken,
    });

    // B6. Save the refresh token to cookie
    res.cookie(authConstants.KeyCookie.RefreshToken, refreshToken, {
      httpOnly: true,
      secure: appConfig.NodeEnv === appConstants.NodeEnv.Production,
      sameSite: "none",
    });

    return {
      user: new AuthEntities({
        userId: user.id,
        email: user.email,
        accessToken,
      }),
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

    // B3. Check password format
    if (!AuthValidate.isPasswordValid(password)) {
      throw new Error("Password is invalid");
    }

    // B4. Check if the email is already registered
    const isEmailRegistered = await userModel.findOneByEmail({ email });

    // B5. If the email is already registered, throw an error
    if (isEmailRegistered) {
      throw new Error("Email is already registered");
    }

    // B6. Hash the password
    const hashedPassword = PasswordUtils.hash({ password });

    // B7. Save the user to the database
    const user = await userModel.create({ email, password: hashedPassword });

    // B8. Return the user and message
    return {
      user: new AuthEntities({
        userId: user.id,
        email: user.email,
      }),
      message: "Registration successful",
    };
  }

  async forgetPassword({ email }) {
    // B1. Check invalidation for email
    const fieldsToCheck = ["email"];
    const invalidFields = AuthValidate.checkFields({ email }, fieldsToCheck);

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
    const user = await userModel.findOneByEmail({ email });

    // B4. If the email is not registered, throw an error
    if (!user) {
      throw new Error("Email is not registered");
    }

    // B5. Return the user and message
    return {
      user: new AuthEntities({
        userId: user.id,
        email: user.email,
      }),
      message: "Forget password successful",
    };
  }
}

module.exports = new AuthService();
