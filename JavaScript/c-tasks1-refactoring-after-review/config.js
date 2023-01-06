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
  http: { port: 8001 },
  ws: { port: 8001 },
  fastify: { port: 8001 },
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
/**
 * Selected network transport for API. Available values:
 * - `http` handled by Node's native http module
 * - `ws`
 * - `fastify` HTTP handled by Fastify framework
 */
const transport = 'fastify';
/** Selected logger service. Available values: `native` | `logger` | `pino` */
const logger = 'pino';
/** Path to the folder to store log files in. Relative path allowed. */
const logDirPath = './log';

module.exports = {
  DB,
  SERVERS,
  HASHING,
  SANDBOX_RUN_OPTIONS,
  transport,
  logger,
  logDirPath,
};
