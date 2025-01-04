const { Pool } = require("pg");
const { pgConfig } = require("../configs/db.conf");

class PgDatabase {
  constructor({ showLogs = false } = {}) {
    this.pool = new Pool({
      user: pgConfig.User,
      host: pgConfig.Host,
      database: pgConfig.Database,
      password: pgConfig.Password,
      port: pgConfig.Port,
    });
    this.showLogs = showLogs;
  }

  async connect() {
    try {
      const client = await this.pool.connect();
      console.log("Connected to the PostgreSQL database 🐘");
      return client;
    } catch (err) {
      console.error("Error connecting to the PostgreSQL database", err);
      throw err;
    }
  }

  async query(text, params) {
    const client = await this.connect();
    try {
      if (this.showLogs) {
        console.log("Executing query:", text);
        console.log("With parameters:", params);
      }
      const res = await client.query(text, params);
      return res;
    } finally {
      client.release();
    }
  }
}

module.exports = new PgDatabase({ showLogs: true }); // Set showLogs to true to enable logging
