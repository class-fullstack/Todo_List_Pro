const AuthValidate = require("../../share/validates/auth.validate");
const userModel = require("../models/user.model");
const PasswordUtils = require("../../share/utils/password.utils");
const AuthEntities = require("../../share/entities/auth.entities");
const authConstants = require("../../share/constants/auth.constants");
const TokenUtils = require("../../share/utils/token.utils");
const tokenConfig = require("../../share/configs/token.conf");
const appConfig = require("../../share/configs/app.conf");
const appConstants = require("../../share/constants/app.constants");
const emailUtils = require("../../share/utils/email.utils");
const QRCode = require("../../share/utils/qrcode.utils");
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
      secret: tokenConfig.AccessSecret,
      expiresIn: authConstants.JwtTime.AccessToken,
    });

    const refreshToken = TokenUtils.generateRefreshToken({
      payload: { userId: user.id },
      secret: tokenConfig.RefreshSecret,
      expiresIn: authConstants.JwtTime.RefreshToken,
    });

    // B6. Save the refresh token to cookie
    res.cookie(authConstants.KeyCookie.RefreshToken, refreshToken, {
      httpOnly: true,
      secure: appConfig.NodeEnv === appConstants.NodeEnv.Production,
      sameSite: "none",
    });

    // B7. Return the user and message
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

    // B5. Generate a random password
    const randomPassword = PasswordUtils.generateRandomPassword();

    if (!randomPassword) {
      throw new Error("Cannot generate random password");
    }

    // B6. Hash the random password
    const hashedPassword = PasswordUtils.hash({ password: randomPassword });

    // B7. Update the user's password
    userModel.updateUserById({
      id: user.id,
      fields: { password_hash: hashedPassword },
    });

    emailUtils.sendEmail({
      to: email,
      subject: "Your New Password",
      text: `Hello ${user.email},\n\nYour password has been reset. Your new password is:\n\n${randomPassword}\n\nPlease change your password after logging in.\n\nBest regards,\nClass02`,
      html: `<p>Hello ${user.email},</p><p>Your password has been reset. Your new password is:</p><p><strong>${randomPassword}</strong></p><p>Please change your password after logging in.</p><p>Best regards,<br>Class O2</p>`,
    });

    // B5. Return the user and message
    return {
      user: new AuthEntities({
        userId: user.id,
        email: user.email,
      }),
      message: "Forget password successful",
    };
  }

  async logout(res) {
    // B1. Clear the refresh token in the cookie
    res.clearCookie(authConstants.KeyCookie.RefreshToken);

    // B2. Return the message
    return {
      message: "Logout successful",
    };
  }

  async generateQRCode(req) {
    // B1. Get the user ID from the request
    const { userId, deviceId } = req;

    // B2. Check invalidation for user ID
    const fieldsToCheck = ["userId"];
    const invalidFields = AuthValidate.checkFields({ userId }, fieldsToCheck);
    if (invalidFields.length > 0) {
      throw new Error(
        `The following fields are required: ${invalidFields.join(", ")}`
      );
    }

    // B3. Check if the user ID is valid
    const user = await userModel.findOneById({ id: userId });
    if (!user) {
      throw new Error("User not found");
    }

    // B4. Create a secret key (token)
    const encryptedData = TokenUtils.generateToken({
      payload: { userId: user.id, deviceId },
      secret: tokenConfig.EncryptSecret,
      expiresIn: authConstants.JwtTime.QrCode,
    });

    // B5. Generate a URL with token
    const baseURL = process.env.BASE_URL; // Ensure BASE_URL is defined in environment variables
    const qrURL = `${baseURL}/api/v1/users/scan-qr-code?token=${encodeURIComponent(
      encryptedData
    )}`;

    // B6. Generate a QR code from the URL
    const qrCode = await QRCode.generateQRCode(qrURL);

    return {
      dataImage: qrCode, // The QR code image
      url: qrURL, // The generated URL
      message: "Generate QR code with URL successful",
    };
  }
}

module.exports = new AuthService();
