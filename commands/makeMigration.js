import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default function makeMigration(name) {
  if (!name) {
    console.error('❌ Migration name is required');
    console.error('Example: make:migration create_users_table');
    process.exit(1);
  }

  const timestamp = Date.now();
  const filename = `${timestamp}_${name}.js`;
  const migrationsDir = path.join(__dirname, '../migrations');

  // Ensure migrations folder exists
  if (!fs.existsSync(migrationsDir)) {
    fs.mkdirSync(migrationsDir, { recursive: true });
  }

  const filePath = path.join(migrationsDir, filename);

  const template = `export async function up(db) {
  await db.query()
}

export async function down(db) {
  // Rollback migration here
}

export default { up, down };
`;

  fs.writeFileSync(filePath, template);
  console.log(`✅ Migration created: ${filename}`);

  process.exit(1);
}
