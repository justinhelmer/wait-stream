# wait-stream
Simple wait module for streams3 in node.

[![npm package](https://badge.fury.io/js/wait-stream.svg)](https://www.npmjs.com/package/wait-stream)
[![node version](https://img.shields.io/node/v/wait-stream.svg?style=flat)](http://nodejs.org/download/)
[![build status](https://travis-ci.org/justinhelmer/wait-stream.svg?branch=master)](https://travis-ci.org/justinhelmer/wait-stream)
[![coverage status](https://coveralls.io/repos/github/justinhelmer/wait-stream/badge.svg?branch=master)](https://coveralls.io/github/justinhelmer/wait-stream?branch=master)
[![dependency status](https://david-dm.org/justinhelmer/wait-stream.svg)](https://github.com/justinhelmer/wait-stream)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/justinhelmer/wait-stream/issues)
[![devDependency status](https://david-dm.org/justinhelmer/wait-stream/dev-status.svg)](https://github.com/justinhelmer/wait-stream)

Set a delay in a pipeline using [setTimeout](https://nodejs.org/api/timers.html#timers_settimeout_callback_delay_arg). Works well with [Gulp](http://gulpjs.com/).

Uses [through2](https://github.com/rvagg/through2) as opposed to `node` core's [stream](https://nodejs.org/api/stream.html) module. See this excellent article by @rvagg for more:

> [Why I don't use Node's core 'stream' module](https://r.va.gg/2014/06/why-i-dont-use-nodes-core-stream-module.html)

## Usage

### wait(timeout[, options])

#### timeout

> _{number}_ The delay in `ms` to pass to [setTimeout](https://nodejs.org/api/timers.html#timers_settimeout_callback_delay_arg).

### options

#### once

> _{boolean}_ The delay will only happen for the first chunk to enter the stream; all other chunks will pass through immediately.

## Example

```js
const wait = require('wait-stream');

pipeline
    .pipe(wait(500)) // wait 500 ms before continuing
    .pipe(nextTask);
```

### Example using Gulp

> Added because of the rising popularity of [Gulp](http://gulpjs.com/).

```js
const gulp = require('gulp');
const wait = require('wait-stream');

gulp.task('default', build);

function build() {
  gulp.src('source/**')
      .pipe(build)               // could be anything
      .pipe(wait(500))           // wait 500 ms before continuing
      .pipe(gulp.dest('dest'));
}
```

## Contributing

[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/justinhelmer/wait-stream/issues)
[![devDependency status](https://david-dm.org/justinhelmer/wait-stream/dev-status.svg)](https://github.com/justinhelmer/wait-stream)

## License

The MIT License (MIT)

Copyright (c) 2016 Justin Helmer

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
