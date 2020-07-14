# CHANGELOG

## v1.2.0

* Add new `setEnabled` function to enable / disable logger. Logger is enabled by default.
* Fix type file not exporting function declarations
* Fix typo in `setLogLevel` function declaration in type file

## v1.1.1

* Add automated Github actions pipeline

## v1.1.0

### Changes

* level parameter is now optional for `logExpression`. If omitted, will always log regardless of level.

### Bugfixes

* Fix month being off by one in timestamp.
* Fix typo in function name in type definition for `setLogLevel`.

## v1.0.0

* Initial Release
