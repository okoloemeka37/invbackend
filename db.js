import mysql from 'mysql2/promise';

const DB_NAME ='b8gnxtlgiy61lcjlezzh' //'INV'//;
/* 
 const baseConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
}
   */

 const baseConfig = {
  host: 'b8gnxtlgiy61lcjlezzh-mysql.services.clever-cloud.com',
  user: 'u9qyighrpu9qxsms',
  password: 'hsuiO1rHMtGZiUX89x7p',
}; 

/**
 * Ensure database exists
 */
async function ensureDatabase() {
  const connection = await mysql.createConnection(baseConfig);

  await connection.query(
    `CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\``
  );

  await connection.end();
}

/**
 * Create pool AFTER DB exists
 */
await ensureDatabase();

const db = mysql.createPool({
  ...baseConfig,
  database: DB_NAME,
  waitForConnections: true,
  connectionLimit: 10
});

export default db;
