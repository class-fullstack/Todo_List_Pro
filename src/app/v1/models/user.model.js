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
      const query =
        "SELECT * FROM users WHERE email = $1 AND is_deleted = false";
      const values = [email];
      const { rows } = await pgDatabase.query(query, values);
      return rows[0];
    } catch (error) {
      throw Logger.logError(error);
    }
  }

  async findOneById({ id }) {
    try {
      const query = "SELECT * FROM users WHERE id = $1 AND is_deleted = false";
      const values = [id];
      const { rows } = await pgDatabase.query(query, values);
      return rows[0];
    } catch (error) {
      throw Logger.logError(error);
    }
  }

  async findOneByUsername({ username }) {
    try {
      const query =
        "SELECT * FROM users WHERE username = $1 AND is_deleted = false";
      const values = [username];
      const { rows } = await pgDatabase.query(query, values);
      return rows[0];
    } catch (error) {
      throw Logger.logError(error);
    }
  }

  async updateUserById({ id, fields }) {
    try {
      const setClause = Object.keys(fields)
        .map((key, index) => `${key} = $${index + 1}`)
        .join(", ");
      const values = Object.values(fields);
      values.push(id);

      const query = `UPDATE users SET ${setClause} WHERE id = $${values.length} AND is_deleted = false`;
      await pgDatabase.query(query, values);
    } catch (error) {
      throw Logger.logError(error);
    }
  }
}

module.exports = new UserModel();
