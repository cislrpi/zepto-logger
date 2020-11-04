const color = require('ansi-colors');

let logLevel = 1;
let isEnabled = true;

/**
 * Get the currently set log level.
 *
 * @return {number}
 */
module.exports.getLogLevel = () => {
  return logLevel;
};

/**
 * Set the log level.
 *
 * @param {number} level
 */
module.exports.setLogLevel = (level) => {
  logLevel = level;
};

/**
 * Log an expression to console at a specific level.
 *
 * @param {*} msg
 * @param {number} [level]
 * @param {string|undefined} prefix
 */
module.exports.logExpression = (msg, level, prefix) => {
  if ((level !== undefined && level > logLevel) || !isEnabled) {
    return;
  }
  const now = new Date();
  const date = [
    now.getFullYear(),
    now.getMonth() + 1,
    now.getDate()
  ].map((val) => val.toString().padStart(2, '0')).join('-');
  const time = [
    now.getHours(),
    now.getMinutes(),
    now.getSeconds()
  ].map((val) => val.toString().padStart(2, '0')).join(':');
  const datetime = `[${date} ${time}.${now.getMilliseconds().toString().padStart(3, '0').substr(0, 2)}]`;
  const start = `${prefix ? prefix + ' ' : ''}${datetime}`;
  if (typeof msg === 'object') {
    console.log(start);
    console.log(JSON.stringify(msg, null, 2));
  }
  else {
    console.log(`${start} ${msg}`);
  }
};

/**
 * Enable or disable logExpression globally.
 *
 * @param {bool} enabled
 */
module.exports.setLoggerEnabled = (enabled) => {
  if (typeof enabled === 'string') {
    enabled = enabled.toLowerCase() === 'true';
  }
  isEnabled = !!enabled;
};

/**
 * Log debug message
 *
 * @param {*} msg
 */
module.exports.debug = (msg) => {
  this.logExpression(msg, 2, color.blue('[debug]'));
};

/**
 * Log info message
 *
 * @param {*} msg
 */
module.exports.info = (msg) => {
  this.logExpression(msg, 1, color.green('[info ]'));
};

/**
 * Log warn message
 *
 * @param {*} msg
 */
module.exports.warn = (msg) => {
  this.logExpression(msg, 0, color.yellow('[warn ]'));
};

/**
 * Log error message
 *
 * @param {*} msg
 */
module.exports.error = (msg) => {
  this.logExpression(msg, -1, color.red('[error]'));
};

/**
 * Log fatal message
 *
 * @param {*} msg
 */
module.exports.fatal = (msg) => {
  this.logExpression(msg, -2, color.bold.red('[FATAL]'))
}
