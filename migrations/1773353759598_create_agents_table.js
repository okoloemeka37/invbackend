export async function up(db) {
  await db.query(`
    CREATE TABLE agents (
      id INT AUTO_INCREMENT PRIMARY KEY,
      userId VARCHAR(255) NOT NULL,
      type VARCHAR(255) NOT NULL,
      agentId VARCHAR(255) NOT NULL,
      name VARCHAR(255) NOT NULL,
      passcode VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
    )
  `);
}

export async function down(db) {
  // Rollback migration here
}

export default { up, down };
