# CHANGELOG

## v1.3.1

* Add `fatal` log method. It uses level -2.

## v1.2.1

* Move from chalk to ansi-colors for colored output.

## v1.2.0

* Add new `setLoggerEnabled` function to enable / disable logger. Logger is enabled by default.
* Add new `debug`, `info`, `warn`, and `error` log methods. They use levels 2, 1, 0, and -1 respectively.
* Add new `getLogLevel` method to get currently set log level.
* Fix type file not exporting function declarations.
* Fix typo in `setLogLevel` function declaration in type file.

## v1.1.1

* Add automated Github actions pipeline.

## v1.1.0

### Changes

* level parameter is now optional for `logExpression`. If omitted, will always log regardless of level.

### Bugfixes

* Fix month being off by one in timestamp.
* Fix typo in function name in type definition for `setLogLevel`.

## v1.0.0

* Initial Release.
