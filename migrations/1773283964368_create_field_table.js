export async function up(db) {
  await db.query(`
    CREATE TABLE field (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT(11  )
      Tracking_Id INT(11),
      address VARCHAR(255) NOT NULL,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(100),
     phone  VARCHAR(255),
     date DATE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
    )
  `);
}

export async function down(db) {
   await db.query(`DROP TABLE field`);
}

export default { up, down };
