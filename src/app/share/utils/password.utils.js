const bcrypt = require("bcrypt");

class PasswordUtils {
  static hash({ password }) {
    return bcrypt.hashSync(password, 10);
  }

  static compare({ password, hash }) {
    return bcrypt.compareSync(password, hash);
  }
}

module.exports = PasswordUtils;
