#!/usr/bin/env node
import migrate from './commands/migrate.js';
import makeMigration from './commands/makeMigration.js';

const command = process.argv[2];
const argument = process.argv[3];

switch (command) {
  case 'migrate':
    await migrate();
    break;

  case 'make:migration':
    makeMigration(argument);
    break;

  default:
    console.log(`
Available commands:
  migrate
  make:migration <name>

Examples:
  node cli.js migrate
  node cli.js make:migration create_users_table
`);
}
