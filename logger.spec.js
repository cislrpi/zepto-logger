const logger = require('./logger');

function getRegExp(msg, prefix) {
  if (msg) {
    msg = ' ' + msg;
  }
  return new RegExp(`^${(prefix ? prefix + ' ' : '')}\\[[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}(?::[0-9]{2}){2}.[0-9]{2}\\]${msg ? msg : ''}$`);
}

describe('logger', () => {
  const originalLog = console.log;
  const originalLevel = logger.getLogLevel();

  let logOutput = [];

  beforeAll(() => console.log = (msg) => logOutput.push(msg));
  beforeEach(() => {
    logOutput = []
    logger.setLogLevel(originalLevel);
  });
  afterAll(() => console.log = originalLog);

  test('logExpression string', () => {
    logger.logExpression('test');
    expect(logOutput).toHaveLength(1);
    expect(logOutput[0]).toMatch(
      getRegExp('test')
    );
  });

  test('logExpression object', () => {
    const obj = {test: true};
    logger.logExpression(obj);
    expect(logOutput).toHaveLength(2);
    expect(logOutput[0]).toMatch(getRegExp());
    expect(logOutput[1]).toMatch(JSON.stringify(obj, null, 2));
  });

  test('logExpression, prefix', () => {
    logger.logExpression('test', 0, 'info');
    expect(logOutput).toHaveLength(1);
    expect(logOutput[0]).toMatch(getRegExp('test', 'info'));
  });

  test('logExpression, no prefix, level', () => {
    logger.logExpression('test', 0);
    logger.logExpression('test 1', 1);
    logger.logExpression('test 2', 2);
    expect(logOutput).toHaveLength(2);
    expect(logOutput[0]).toMatch(
      getRegExp('test')
    );
    expect(logOutput[1]).toMatch(
      getRegExp('test 1')
    );
  });

  test('logExpression after setLogLevel', () => {
    logger.logExpression('test', 1);
    logger.logExpression('test', 2);
    expect(logOutput).toHaveLength(1);
    logger.setLogLevel(2);
    logger.logExpression('test', 2);
    expect(logOutput).toHaveLength(2);
  });

  test('logExpression after setLoggerEnabled', () => {
    logger.logExpression('test');
    logger.setLoggerEnabled(false);
    logger.logExpression('test 1');
    expect(logOutput).toHaveLength(1);
    logger.setLoggerEnabled(true);
    logger.logExpression('test 2');
    expect(logOutput).toHaveLength(2);
  });

  test('setLoggerEnabled with string arg', () => {
    logger.setLoggerEnabled('false');
    logger.logExpression('test');
    expect(logOutput).toHaveLength(0);
    logger.setLoggerEnabled('true');
    logger.logExpression('test');
    expect(logOutput).toHaveLength(1);
  });

  test('debug', () => {
    logger.debug('test');
    expect(logOutput).toHaveLength(0);
    logger.setLogLevel(2);
    logger.debug('test');
    expect(logOutput).toHaveLength(1);
    expect(logOutput[0]).toContain('[debug]');
    expect(logOutput[0]).toMatch(/test$/);
  });

  test('info', () => {
    logger.info('test');
    expect(logOutput).toHaveLength(1);
    expect(logOutput[0]).toContain('[info ]');
    expect(logOutput[0]).toMatch(/test$/);
  });

  test('warn', () => {
    logger.warn('test');
    expect(logOutput).toHaveLength(1);
    expect(logOutput[0]).toContain('[warn ]');
    expect(logOutput[0]).toMatch(/test$/);
  });

  test('error', () => {
    logger.error('test');
    expect(logOutput).toHaveLength(1);
    expect(logOutput[0]).toContain('[error]');
    expect(logOutput[0]).toMatch(/test$/);
  });
});
