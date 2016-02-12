(function() {
  'use strict';

  var chai = require('chai');
  var sinon = require('sinon');
  var sinonChai = require('sinon-chai');
  var expect = chai.expect;
  var requireSubvert = require('require-subvert')(__dirname);

  chai.use(sinonChai);

  var sandbox = sinon.sandbox.create();

  describe('wait-stream (exported module)', function() {
    var callback;
    var file;
    var map;
    var timeout;

    beforeEach(function() {
      file = 'FILE';
      callback = sandbox.spy();
      timeout = sandbox.spy(global, 'setTimeout');

      map = function(cb) {
        cb(file, callback);
      };

      requireSubvert.subvert('map-stream', map);
      requireSubvert.require('../index')(1000);
    });

    afterEach(function() {
      sandbox.restore();
    });

    it('should wait for the specified duration', function() {
      expect(timeout).to.have.been.calledWithExactly(sinon.match.typeOf('function'), 1000);
    });

    it('should continue after waiting', function() {
      timeout.args[0][0]();
      expect(callback).to.have.been.calledWithExactly(null, file);
    });
  });
})();
