const logDirPath = require('./config.js').logDirPath;
const path = require('node:path');
const util = require('node:util');
const pino = require('pino');

class PinoAdapter {
  constructor(logPath) {
    const date = new Date().toISOString().substring(0, 10);
    const filePath = path.join(logPath, `${date}.log`);
    this.streams = [
      {stream: process.stdout},
      {stream: pino.destination({
        dest: filePath,
        sync: false,
      })}
    ];

    // Instantiate Pino logger
    this.logger = pino({
      level: 'debug'
    }, pino.multistream(this.streams));

    // Specific rule to cleanup absolute path from stack trace
    this.regexp = new RegExp(path.dirname(process.cwd()), 'g');
  };

  log(...args) {
    const msg = util.format(...args);
    this.logger.info(msg);
  }

  dir(...args) {
    const msg = util.inspect(...args);
    this.logger.info(msg);
  }



  // Pass through adapter the logging methods
  trace(...args) { this.logger.trace(...args) }
  debug(...args) { this.logger.debug(...args) }
  info(...args) { this.logger.info(...args) }
  warn(...args) { this.logger.warn(...args) }
  error(err, ...args) {
    // Remove absolute path part from stack trace
    if (
      typeof err === 'object' &&
      (err instanceof Error || Object.prototype.toString.call(err) === '[object Error]')
    ) err.stack = err.stack?.replace(this.regexp, '');

    this.logger.error({err}, ...args)
  }
  fatal(...args) { this.logger.fatal(...args) }
}

module.exports = new PinoAdapter(logDirPath);
