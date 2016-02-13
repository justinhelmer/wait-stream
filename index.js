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
   * @param {object} [options] - The options to modify the behavior of wait().
   * @param {boolean} [options.once] - Only wait for the very first chunk into the pipe.
   * @return {stream} - The node stream for piping.
   */
  function wait(timeout, options) {
    options = options || {};
    var waited = false;

    return through2.obj(function(chunk, enc, callback) {
      var stream = this;

      if (!options.once || !waited) {
        setTimeout(function() {
          stream.push(chunk);
          callback();
        }, timeout || 0);

        waited = true;
      } else {
        stream.push(chunk);
        callback();
      }
    });
  }

  module.exports = wait;
})();
