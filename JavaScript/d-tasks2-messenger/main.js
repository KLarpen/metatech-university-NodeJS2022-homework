'use strict';

const fsp = require('node:fs').promises;
const path = require('node:path');
const config = require('./config.js');
const load = require('./load.js')(config.SANDBOX_RUN_OPTIONS);
const server = require(`./transport/${config.transport}.js`);
const staticServer = require('./static.js');
const db = require('./db.js')(config.DB);
const hash = require('./hash.js')(config.HASHING);
const logger = require('./logger/provider.js')({
  ...config.LOGGER,
  /** Absolute path to the application root folder to filter out from stack traces */
  appRootPath: process.cwd()
});

const sandbox = {
  console: Object.freeze(logger),
  db: Object.freeze(db),
  common: { hash },
};
const apiPath = path.join(process.cwd(), './api');
const routing = {};

(async () => {
  const files = await fsp.readdir(apiPath);
  for (const fileName of files) {
    if (!fileName.endsWith('.js')) continue;
    const filePath = path.join(apiPath, fileName);
    const serviceName = path.basename(fileName, '.js');
    routing[serviceName] = await load(filePath, Object.freeze({ ...sandbox}));
    logger.log('Service { name: %s, methods: [%s] }', serviceName, Object.keys(routing[serviceName]).join(', '));
  }

  staticServer('./static', config.SERVERS.static.port, sandbox.console);
  server(routing, config.SERVERS[config.transport].port, {
    console: sandbox.console,
    allowedClientOrigins: [config.SERVERS.static]
  });
})();
