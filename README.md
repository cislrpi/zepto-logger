# @cisl/zepto-logger

[![npm (scoped)](https://img.shields.io/npm/v/@cisl/zepto-logger)](https://npmjs.com/package/@cisl/zepto-logger)
[![Test](https://github.com/cislrpi/zepto-logger/workflows/Test/badge.svg?branch=master&event=push)](https://github.com/cislrpi/zepto-logger/actions?query=workflow%3ATest+branch%3Amaster+event%3Apush)
[![codecov](https://codecov.io/gh/cislrpi/zepto-logger/branch/master/graph/badge.svg)](https://codecov.io/gh/cislrpi/zepto-logger)

A minimalistic, zero-dependency logger that writes messages to the console with
the current timestamp. Good for debugging, but for a production grade
application, probably worth looking elsewhere.

## Installation

```bash
npm install @cisl/zepto-logger
```

## Usage

```javascript
const {setLogLevel, logExpression, setLoggerEnabled} = require('@cisl/zepto-logger');

logExpression('This message will always print with no level');

// by default the logLevel starts at 1
logExpression('This message will print', 1);
logExpression('This message will not print', 2);

setLogLevel(2);
logExpression('This message will now print', 2);

// can also log objects and other types, not just strings
logExpression({foo: 1, bar: 2, baz: {a: 1, b: 2}}, 1);

setLoggerEnabled(false);
logExpression('this will not log now');
setLoggerEnabled(true);
```

## API

```typescript
/**
 * Set the log level.
 */
function setLogLevel(level: number): void;

/**
 * Log an expression to console at a specific level.
 */
function logExpression(msg: any, level?: number): void;

/**
 * Enable or disable logExpression globally
 */
function setLoggerEnabled(enabled: boolean): void;
```
