const pgDatabase = require("../../share/database/pg.database");
const Logger = require("../../share/utils/logger.utils");

class UserModel {
  async create({ email, password }) {
    try {
      const query =
        "INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING *";
      const values = [email, password];
      const { rows } = await pgDatabase.query(query, values);
      return rows[0];
    } catch (error) {
      throw Logger.logError(error);
    }
  }

  async findOneByEmail({ email }) {
    try {
      const query = "SELECT * FROM users WHERE email = $1";
      const values = [email];
      const { rows } = await pgDatabase.query(query, values);
      return rows[0];
    } catch (error) {
      throw Logger.logError(error);
    }
  }
}

module.exports = new UserModel();
