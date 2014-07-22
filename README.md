angular-duration
==================

Angular directive to turn arbitrary amounts of milliseconds into human-readable durations.

[![Build Status](https://travis-ci.org/ketilovre/angular-duration.svg?branch=master)](https://travis-ci.org/ketilovre/angular-duration)
[![Code Climate](https://codeclimate.com/github/ketilovre/angular-duration.png)](https://codeclimate.com/github/ketilovre/angular-duration)
[![Test Coverage](https://codeclimate.com/github/ketilovre/angular-duration/coverage.png)](https://codeclimate.com/github/ketilovre/angular-duration)

##Usage

1. Install via Bower.

  `bower install angular-duration --save`

2. Include 'angularDuration' as a dependency for your app.

  ```javascript
    angular.module('myApp', ['angularDuration'])
  ```

3. Add the directive `duration` to an element, along with the data source
  ```html
    <span duration="{Int}"></span>
  ```

#####Arguments

- `duration` - A duration in milliseconds.
