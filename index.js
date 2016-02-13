/**
 * @file index.js
 *
 * Simple wait module for through and through2 node streams.
 */
(function() {
  'use strict';

  var through2 = require('through2');

  /**
   * Through2 stream with a simple passthrough after a specified duration.
   *
   * @name wait
   * @param {number} timeout - The duration to wait, in milliseconds.
   * @return {stream} - The node stream for piping.
   */
  function wait(timeout) {
    return through2.obj(function(chunk, enc, callback) {
      var stream = this;

      setTimeout(function() {
        stream.push(chunk);
        callback();
      }, timeout || 0);
    });
  }

  module.exports = wait;
})();
