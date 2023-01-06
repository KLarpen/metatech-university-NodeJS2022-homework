'use strict';

const fsp = require('node:fs').promises;
const path = require('node:path');
const {SERVERS: serversConf, transport} = require('./config.js');
const server = require(`./transport/${transport}.js`);
const staticServer = require('./static.js');
const db = require('./db.js');
const hash = require('./hash.js');
const logger = require('./consoleProvider.js');

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
    if (!fileName.endsWith('.mjs')) continue;
    const filePath = path.join(apiPath, fileName);
    const serviceName = path.basename(fileName, '.mjs');
    const {
      default: serviceDIContainer
    } = await import(filePath);
    routing[serviceName] = await serviceDIContainer(Object.freeze({ ...sandbox}));
    logger.log('Service { name: %s, methods: [%s] }', serviceName, Object.keys(routing[serviceName]).join(', '));
  }

  staticServer('./static', serversConf.static.port);
  server(routing, serversConf[transport].port);
})();
