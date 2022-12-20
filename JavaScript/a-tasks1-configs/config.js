'use strict';

/** Database settings */
const DB = {
  host: '127.0.0.1',
  port: 5432,
  database: 'example',
  user: 'marcus',
  password: 'marcus',
};
/**
 * Configuration of the network servers by supported types
 */
const SERVERS = {
  static: { port: 8000 },
  http: { port: 8002 },
  ws: { port: 8001 },
};
/** Crypto module settings for the hashing algorithm */
const HASHING = {
  saltLength: 16,
  keyLength: 64,
};
/** Sandboxes settings */
const SANDBOX_RUN_OPTIONS = {
  timeout: 5000,
  displayErrors: false,
};

module.exports = {
  DB,
  SERVERS,
  HASHING,
  SANDBOX_RUN_OPTIONS,
};
