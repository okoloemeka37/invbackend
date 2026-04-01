export async function up(db) {
  await db.query(`
    CREATE TABLE records (
      id INT AUTO_INCREMENT PRIMARY KEY,
      fieldId VARCHAR(255) NOT NULL,
      Tracking_Id VARCHAR(255) NOT NULL,
      user_Id VARCHAR(255) NOT NULL,
      agentId VARCHAR(255) NOT NULL,
      record_Id VARCHAR(255) NOT NULL,
      location VARCHAR(255) NOT NULL,
      parameter VARCHAR(255) NOT NULL,
      parameterId VARCHAR(255) NOT NULL,
      price VARCHAR(255) NOT NULL,
      quantity VARCHAR(255) NOT NULL,
      width VARCHAR(255) NOT NULL,
      breadth VARCHAR(255) NOT NULL,
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

