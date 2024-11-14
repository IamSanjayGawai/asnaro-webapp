import mysql from "mysql2/promise";

export async function connectSQLDatabase() {
  const connection = await mysql.createConnection({
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    database: process.env.SQL_DB,
    port: process.env.SQL_PORT as unknown as number,
    password: process.env.SQL_PASS,
  });
  return connection;
}
