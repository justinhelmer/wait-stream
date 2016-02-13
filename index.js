/**
 * @file index.js
 *
 * Simple wait module for through and through2 node streams.
 */
(function() {
  'use strict';

  var map = require('map-stream');

  /**
   * Through stream with a simple passthrough after a specified duration.
   *
   * @name wait
   * @param {number} timeout - The duration to wait, in milliseconds.
   * @param {boolean} [options.through2] - If set to `true`, will use through2 streams instead of through streams.
   * @return {stream} - The through stream for piping.
   */
  function wait(timeout) {
    return map(function(file, cb) {
      setTimeout(function() {
        cb(null, file);
      }, timeout || 0);
    });
  }

  module.exports = wait;
})();
