require("dotenv").config();

const { Pool } = require("pg");

const connection =
  process.env.NODE_ENV === "production"
    ? process.env.PROD_DB_CONNECTION_STRING
    : process.env.DEV_DB_CONNECTION_STRING;

module.exports = new Pool({
  connectionString: connection,
});
