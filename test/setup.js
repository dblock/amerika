chai = require('chai');
expect = chai.expect;
chai.use(require('chai-string'));
chai.use(require('chai-http'));

before(async () => {
  server = require('../server');
});

after(async () => {
  server.stop();
});