const pgDatabase = require("../../share/database/pg.database");
const Logger = require("../../share/utils/logger.utils");

class DeviceIdModel {
  async upsertDeviceId({ deviceId }) {
    try {
      const query = `
        INSERT INTO deviceId (deviceId)
        VALUES ($1)
        ON CONFLICT (deviceId)
        DO NOTHING
        RETURNING *;
      `;
      const values = [deviceId];
      const res = await pgDatabase.query(query, values);
      return res.rows[0];
    } catch (error) {
      throw Logger.logError(error);
    }
  }

  async findOneByDeviceId({ deviceId }) {
    try {
      const query = `
        SELECT *
        FROM deviceId
        WHERE device_id = $1;
      `;
      const values = [deviceId];
      const res = await pgDatabase.query(query, values);
      return res.rows[0];
    } catch (error) {
      throw Logger.logError(error);
    }
  }

  async updateUserIdByDeviceId({ userId, deviceId }) {
    try {
      const query = `
        UPDATE deviceId
        SET userId = $1
        WHERE deviceId = $2
        RETURNING *;
      `;
      const values = [userId, deviceId];
      const res = await pgDatabase.query(query, values);
      return res.rows[0];
    } catch (error) {
      throw Logger.logError(error);
    }
  }
}

module.exports = new DeviceIdModel();
