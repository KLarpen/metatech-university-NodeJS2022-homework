'use strict';

const fsp = require('node:fs').promises;
const path = require('node:path');
const config = require('./config.js');
const server = require(`./transport/${config.transport}.js`);
const staticServer = require('./static.js');
const db = require('./db.js');
const hash = require('./hash.js')(config.HASHING);
const logger = require('./logger/provider.js')({
  ...config.LOGGER,
  /** Absolute path to the application root folder to filter out from stack traces */
  appRootPath: process.cwd()
});

/** Initialize DB connection */
db.init(config.DB);

const sandbox = {
  console: Object.freeze(logger),
  db: Object.freeze(db.crud),
  common: { hash },
};
const apiPath = path.join(process.cwd(), './api');
const routing = {};

(async () => {
  const files = await fsp.readdir(apiPath);
  for (const fileName of files) {
    if (!fileName.endsWith('.mjs')) continue;
    const filePath = path.join(apiPath, fileName);
    const serviceName = path.basename(fileName, '.mjs');
    const {
      default: serviceDIContainer
    } = await import(filePath);
    routing[serviceName] = await serviceDIContainer(Object.freeze({ ...sandbox}));
    logger.log('Service { name: %s, methods: [%s] }', serviceName, Object.keys(routing[serviceName]).join(', '));
  }

  staticServer('./static', config.SERVERS.static.port, sandbox.console);
  server(routing, config.SERVERS[config.transport].port, {
    console: sandbox.console,
    allowedClientOrigins: [config.SERVERS.static]
  });
})();
