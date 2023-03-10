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
  static: { host: '127.0.0.1', port: 8000 },
  http: { port: 8001 },
  ws: { port: 8001 },
  fastify: { port: 8001 },
};
/**
 * Selected network transport for API. Available values:
 * - `http` handled by Node's native http module
 * - `ws`
 * - `fastify` HTTP handled by Fastify framework
 */
const transport = 'http';
/** Logger service settings */
const LOGGER = {
  /** Selected logger service. Available values: `native` | `custom` | `pino` */
  serviceKey: 'custom',
  /** Path to the folder to store log files in. Relative path allowed. */
  logPath: './log',
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
  transport,
  LOGGER,
  HASHING,
  SANDBOX_RUN_OPTIONS,
};
