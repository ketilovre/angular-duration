/* global angular */

angular.module('Demo', ['angularDuration', 'ui.bootstrap'])

    .controller('DemoCtrl', ['$scope', function($scope) {
        "use strict";

        $scope.$watch("time", function(time) {
            $scope.duration = Date.now() - Date.parse(time);
        });

    }]);