import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: "b8gnxtlgiy61lcjlezzh-mysql.services.clever-cloud.com",
  user: "u9qyighrpu9qxsms",
  password: "hsuiO1rHMtGZiUX89x7p",
  port: 3306,
  database: "b8gnxtlgiy61lcjlezzh",
  waitForConnections: true,
  connectionLimit: 10,
});

export default db;
