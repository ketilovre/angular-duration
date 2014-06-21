/* global describe, beforeEach, module, inject, it, expect */

describe("Duration", function() {
    "use strict";

    var $rootScope, $compile, Time;
    beforeEach(module('angularDuration'));

    beforeEach(inject(function(_$rootScope_, _$compile_, _TimeParser_) {
        $rootScope = _$rootScope_;
        $compile = _$compile_;
        Time = _TimeParser_;
    }));

    describe('Service', function() {

        describe('Duration strings', function() {

            it('should return "Less than a minute" for durations under 60 seconds', function() {
                expect(Time.durationString(59000)).toEqual("Less than a minute");
            });

            it('should return number of minutes if the total is less than an hour', function() {
                expect(Time.durationString(600000)).toEqual("10 minutes");
            });

            it('should return hours and minutes if the total is less than a day', function() {
                expect(Time.durationString(80000000)).toEqual("22 hours, 13 minutes");
            });

            it('should return days and hours if the total is less than a week', function() {
                expect(Time.durationString(245000000)).toEqual("2 days, 20 hours");
            });

            it('should return weeks and days if the total is less than a month', function() {
                expect(Time.durationString(1745000000)).toEqual("2 weeks, 6 days");
            });

            it('should return months and days if the total is less than a year', function() {
                expect(Time.durationString(11745000000)).toEqual("4 months, 15 days");
            });

            it('should only return the number of years if the total is more than a year and the remainder is less than a day', function() {
                expect(Time.durationString(31611000000)).toEqual("1 year");
            });

            it('should return years and days if the total is more than a year but the number of weeks are 0', function() {
                expect(Time.durationString(32036000000)).toEqual("1 year, 5 days");
            });

            it('should return years and days if the total is more than a year but the number of months are 0', function() {
                expect(Time.durationString(32836000000)).toEqual("1 year, 2 weeks");
            });

            it('should return years and days if the total is more than a year and the remainder is more than a month', function() {
                expect(Time.durationString(44836000000)).toEqual("1 year, 5 months");
            });

        });

    });

    describe('Directive', function() {

        var $scope;
        beforeEach(function() {
            $scope = $rootScope.$new();
            $scope.undef = undefined;
            $scope.null = null;
            $scope.empty = '';
        });

        it('should print durations', function() {
            $scope.time = 987654321;

            var strElem = $compile('<span data-duration="time"></span>')($scope);
            $scope.$digest();

            expect(strElem.html()).toContain('1 week, 4 days');
        });

        it('should not clear the current content if given invalid input', function() {
            $scope.time = 123456789;

            var strElem = $compile('<span data-duration="time"></span>')($scope);
            $scope.$digest();

            expect(strElem.html()).toContain('1 day, 10 hours');

            $scope.time = null;
            $scope.$digest();

            expect(strElem.html()).toContain('1 day, 10 hours');
        });

        it('it should print nothing, without warning, on undefined, null or empty input', function() {
            var undefElem = $compile('<pre data-duration="undef"></pre>')($scope);
            $scope.$digest();
            expect(undefElem.html()).toEqual('');

            var nullElem = $compile('<pre data-duration="null"></pre>')($scope);
            $scope.$digest();
            expect(nullElem.html()).toEqual('');

            var emptyElem = $compile('<pre data-duration="empty"></pre>')($scope);
            $scope.$digest();
            expect(emptyElem.html()).toEqual('');
        });
    });
});