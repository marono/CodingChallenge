require("@wdio/sync");

require("ts-node").register({ files: true });
const { TimelineService } = require('wdio-timeline-reporter/timeline-service');

exports.config = {
  runner: 'local',
  headless: true,
  specs: ['./test/specs/**/*.ts'],
  exclude: [],
  maxInstances: 10,
  capabilities: [{
    maxInstances: 5,
    browserName: 'chrome',
    'goog:chromeOptions': {
      // to run chrome headless the following flags are required
      // (see https://developers.google.com/web/updates/2017/04/headless-chrome)
      args: ['--headless', '--disable-gpu'],
    },
    acceptInsecureCerts: true
  }],
  logLevel: 'info',
  bail: 0,
  baseUrl: `http://${process.env.HOST || 'localhost'}:3000`,
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  services: ['chromedriver', [TimelineService]],
  framework: 'mocha',
  reporters: ['spec', ['timeline', { outputDir: './reports/timeline' }]],
  mochaOpts: {
    timeout: 60000,
  },
}
