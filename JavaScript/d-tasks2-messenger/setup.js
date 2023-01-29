'use strict';

const fsp = require('node:fs').promises;
const path = require('node:path');
const pg = require('pg');
const metasql = require('metasql');
const config = require('./config.js');

const DB_DIR = path.join(process.cwd(), './db');
const SCHEMAS_DIR = path.join(process.cwd(), './schemas');

const read = (name) => fsp.readFile(path.join(DB_DIR, name), 'utf8');

const execute = async (client, sql) => {
  try {
    await client.query(sql);
  } catch (err) {
    console.error(err);
  }
};

const notEmpty = (s) => s.trim() !== '';

const executeFile = async (client, name) => {
  console.log(`Execute file: ${name}`);
  const sql = await read(name);
  const commands = sql.split(';\n').filter(notEmpty);
  for (const command of commands) {
    await execute(client, command);
  }
};

(async () => {
  await metasql.create(SCHEMAS_DIR, DB_DIR);
  // Rename generated files
  const databaseFile = path.join(DB_DIR, 'database.sql');
  const structureFile = path.join(DB_DIR, 'structure.sql');
  await fsp.rename(databaseFile, structureFile);
  console.log('Generate typings domain.d.ts');
  const typesFile = path.join(DB_DIR, 'database.d.ts');
  const domainTypes = path.join(DB_DIR, 'domain.d.ts');
  await fsp.rename(typesFile, domainTypes);

  console.log('Environment is ready');
})().catch((err) => {
  console.error(err);
});
