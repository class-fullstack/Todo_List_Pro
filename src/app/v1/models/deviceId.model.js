const pgDatabase = require("../../share/database/pg.database");
const Logger = require("../../share/utils/logger.utils");

class DeviceIdModel {
  async upsertDeviceId({ deviceId }) {
    try {
      const query = `
        INSERT INTO device_ids (device_id)
        VALUES ($1)
        ON CONFLICT (device_id)
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
        FROM device_ids
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
        UPDATE device_ids
        SET user_id = $1
        WHERE device_id = $2
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
