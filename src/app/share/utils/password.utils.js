const bcrypt = require("bcrypt");

class PasswordUtils {
  static hash({ password }) {
    return bcrypt.hashSync(password, 10);
  }

  static compare({ password, hash }) {
    return bcrypt.compareSync(password, hash);
  }

  static generateRandomPassword(length = 8) {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  }
}

module.exports = PasswordUtils;
