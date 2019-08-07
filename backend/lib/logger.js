const path = require('path');
const winston = require('winston');
const env = require('../env');
const { createLogger, format, transports } = winston;
const { combine, timestamp, printf, colorize, align } = format;
const DEFAULT_SCOPE = 'app';
const logLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    sql: 4,
    socket: 5,
    debug: 6,
  },
  colors: {
    error: 'red',
    warn: 'darkred',
    info: 'green',
    http: 'cyan',
    sql: 'blue',
    socket: 'blue',
    debug: 'gray',
  },
};

class Logger {

  parsePathToScope(filepath) {
    if (filepath.indexOf(path.sep) >= 0) {
      filepath = filepath.replace(process.cwd(), '');
      filepath = filepath.replace(`${path.sep}src${path.sep}`, '');
      filepath = filepath.replace(`${path.sep}dist${path.sep}`, '');
      filepath = filepath.replace('.ts', '');
      filepath = filepath.replace('.js', '');
      filepath = filepath.replace(path.sep, ':');
    }
    return filepath;
  }

  constructor(scope) {
    this.initialize();
    this.scope = this.parsePathToScope((scope) ? scope : DEFAULT_SCOPE);
  }

  debug(message, ...args) {
    this.log('debug', message, args);
  }

  sql(message, ...args) {
    this.log('sql', message, args);
  }

  http(message, ...args) {
    message = message.substring(0, message.lastIndexOf('\n'));
    this.log('http', message, args);
  }

  info(message, ...args) {
    this.log('info', message, args);
  }

  warn(message, ...args) {
    this.log('warn', message, args);
  }

  error(message, ...args) {
    this.log('error', message, args);
  }

  socket(message, ...args) {
    this.log('socket', message, args);
  }

  log(level, message, args) {
    if (winston) {
      this.logger.log(level, `${message}`, args);
    }
  }

  initialize() {
    const myFormat = combine(
      colorize(),
      timestamp(),
      align(),
      printf(info => {
        const ts = info.timestamp.slice(0, 19).replace('T', ' ');
        return `${ts} ${info.level}: ${info.message}`;
      })
    );
    if (winston) {
      winston.addColors(
        logLevels
      );
      this.logger = createLogger({
        level: env.log_level,
        transports: [
          new transports.Console(),
        ],
        format: myFormat,
        levels: logLevels.levels,
        handleExceptions: true,
      });
    }
  }

}

module.exports = Logger;
