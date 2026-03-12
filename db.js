import mysql from 'mysql2/promise';

const DB_NAME = 'bsfrt39vgbqkzt80ee7d'//INV';

/* const baseConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
}; */

const baseConfig = {
  host: 'bsfrt39vgbqkzt80ee7d-mysql.services.clever-cloud.com',
  user: 'ujr03vrcex7kxuk4',
  password: 'yoDBGf9nxqQzcOvC2Plm',
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
