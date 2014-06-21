angular-json-print
==================

Angular directive to turn arbitrary amounts of milliseconds into human-readable durations.

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
