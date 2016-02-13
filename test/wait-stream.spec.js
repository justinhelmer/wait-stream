(function() {
  'use strict';

  var chai = require('chai');
  var sinon = require('sinon');
  var through2 = require('through2');
  var expect = chai.expect;
  var wait = require('../');

  chai.use(require('dirty-chai'));
  chai.use(require('sinon-chai'));

  var sandbox = sinon.sandbox.create();

  describe('wait-stream (exported module)', function() {
    var callback;
    var chunk;
    var stream;
    var timeout;

    beforeEach(function() {
      callback = sandbox.spy();
      chunk = 'CHUNK';
      stream = [];
      timeout = sandbox.spy(global, 'setTimeout');

      sandbox.stub(through2, 'obj', through2Obj);

      /**
       * Mock through2.obj specifically for its usages within wait-stream.
       *
       * @name through2Obj
       * @param {function} cb - The callback registered to through2.obj by wait-stream.
       */
      function through2Obj(cb) {
        cb.call(stream, chunk, 'encoding', callback);
      }

      wait(1000);
    });

    afterEach(function() {
      sandbox.restore();
    });

    it('should wait for the specified duration', function() {
      expect(timeout).to.have.been.calledWithExactly(sinon.match.typeOf('function'), 1000);
    });

    describe('after waiting for the specified duration', function() {
      beforeEach(function() {
        timeout.args[0][0]();
      });

      it('should push the chunk onto the stream', function() {
        expect(stream).to.eql([chunk]);
      });

      it('should continue the stream', function() {
        expect(callback).to.have.been.called();
      });
    });
  });
})();
