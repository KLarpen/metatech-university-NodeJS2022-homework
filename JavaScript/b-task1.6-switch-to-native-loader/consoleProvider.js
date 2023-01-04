const logger = require('./config.js').logger;
if (logger === 'native') module.exports = console;
else module.exports = require(`./${logger}.js`);
