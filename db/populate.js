#! /usr/bin/env node
require("dotenv").config();

const url = process.argv[2];

if (!url) {
  return 1;
}

const { Client } = require("pg");

const sql = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  fullname VARCHAR ( 255 ) NOT NULL,
  username VARCHAR ( 255 ) NOT NULL UNIQUE,
  password VARCHAR ( 255 ) NOT NULL,
  membership_status BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title VARCHAR ( 255 ) NOT NULL,
  text VARCHAR ( 1023 ) NOT NULL,
  author INTEGER REFERENCES users (id) ON DELETE CASCADE NOT NULL,
  timestamp TIMESTAMP
);`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: url,
  });
  client.on("error", (err) => console.error("connection error", err));
  try {
    await client.connect();
    await client.query(sql);
    await client.end();

    console.log("done");
  } catch (err) {
    console.error(err);
  }
}

main();
