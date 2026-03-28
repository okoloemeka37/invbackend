import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import db from '../db.js';
import { pathToFileURL } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function migrate() {
  try {
    console.log('🚀 Running migrations...\n');

    /**
     * 1. Ensure migrations table exists
     */
    await db.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        migration VARCHAR(255) NOT NULL,
        batch INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    /**
     * 2. Get already-run migrations
     */
    const [executed] = await db.query(
      `SELECT migration FROM migrations`
    );
    const executedMigrations = executed.map(row => row.migration);

    /**
     * 3. Read migration files
     */
    const migrationsPath = path.join(__dirname, '../migrations');
    const migrationFiles = fs
      .readdirSync(migrationsPath)
      .filter(file => file.endsWith('.js'))
      .sort();

    /**
     * 4. Filter pending migrations
     */
    const pendingMigrations = migrationFiles.filter(
      file => !executedMigrations.includes(file)
    );

    if (pendingMigrations.length === 0) {
      console.log('✅ Nothing to migrate.');
      process.exit(1);
      return;
    }

    /**
     * 5. Get next batch number
     */
    const [[result]] = await db.query(
      `SELECT MAX(batch) AS batch FROM migrations`
    );
    const nextBatch = (result.batch || 0) + 1;

    /**
     * 6. Run migrations
     */
 for (const file of pendingMigrations) {
  console.log(`➡️  Migrating: ${file}`);

  const migrationPath = path.join(migrationsPath, file);
  const migrationUrl = pathToFileURL(migrationPath).href;

  const { default: migration } = await import(migrationUrl);

  if (typeof migration.up !== 'function') {
    throw new Error(`Migration ${file} is missing an up() method`);
  }

  await migration.up(db);

  await db.query(
    `INSERT INTO migrations (migration, batch) VALUES (?, ?)`,
    [file, nextBatch]
  );

  console.log(`✔️  Migrated: ${file}\n`);
   process.exit(1);
}


    console.log('🎉 All migrations ran successfully!');
  } catch (error) {
    console.error('\n❌ Migration failed');
    console.error(error);
    process.exit(1);
  }
}
