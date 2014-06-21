/* global angular */

angular.module('angularDuration', [])

    .service('TimeParser', function() {
        "use strict";

        var Time = {

            secondsInAYear: 31536000,

            secondsInADay: 86400,

            secondsInAnHour: 3600,

            inSeconds: function(time) {
                return Math.floor(time / 1000);
            },

            pluralize: function(unit, amount) {
                return " " + (amount > 1 ? unit + "s" : unit);
            },

            years: function(time) {
                return Math.floor(Time.inSeconds(time) / Time.secondsInAYear);
            },

            months: function(time) {
                return Math.floor((Time.inSeconds(time) % Time.secondsInAYear) / (Time.secondsInADay * 30));
            },

            weeks: function(time) {
                return Math.floor((Time.inSeconds(time) % Time.secondsInAYear) / (Time.secondsInADay * 7));
            },

            days: function(time) {
                return Math.floor((Time.inSeconds(time) % Time.secondsInAYear) / Time.secondsInADay);
            },

            hours: function(time) {
                return Math.floor(((Time.inSeconds(time) % Time.secondsInAYear) % Time.secondsInADay) / Time.secondsInAnHour);
            },

            minutes: function(time) {
                return Math.floor((((Time.inSeconds(time) % Time.secondsInAYear) % Time.secondsInADay) % Time.secondsInAnHour) / 60);
            },

            seconds: function(time) {
                return (((Time.inSeconds(time) % Time.secondsInAYear) % Time.secondsInADay) % Time.secondsInAnHour) % 60;
            },

            duration: function(time) {
                return {
                    years: Time.years(time),
                    months: Time.months(time),
                    weeks: Time.weeks(time),
                    days: Time.days(time),
                    hours: Time.hours(time),
                    minutes: Time.minutes(time),
                    seconds: Time.seconds(time)
                };
            },

            durationString: function(time) {
                var duration = Time.duration(time);
                if (duration.years) {
                    return Time.withYear(duration);
                } else if (duration.months) {
                    return Time.withMonths(duration);
                } else if (duration.weeks) {
                    return Time.withWeeks(duration);
                } else if (duration.days) {
                    return Time.withDays(duration);
                } else if (duration.hours) {
                    return Time.withHours(duration);
                } else if (duration.minutes) {
                    return Time.withMinutes(duration);
                } else if (duration.seconds) {
                    return "Less than a minute";
                } else {
                    return "Less than a second";
                }
            },

            withYear: function(duration) {
                return duration.years + Time.pluralize("year", duration.years) + (
                    duration.months ? ", " + Time.withMonths(duration, true) : (
                        duration.weeks ? ", " + Time.withWeeks(duration, true) : (
                            duration.days ? ", " + Time.withDays(duration, true) : ""
                            )
                        )
                    );
            },

            withMonths: function(duration, stop) {
                return duration.months + Time.pluralize("month", duration.months) + (
                        duration.days % 30 && !stop ? ", " + Time.withDays(duration, true, 'months') : ""
                    );
            },

            withWeeks: function(duration, stop) {
                return duration.weeks + Time.pluralize("week", duration.weeks) + (
                        duration.days % 7 && !stop ? ", " + Time.withDays(duration, true, 'weeks') : ""
                    );
            },

            withDays: function(duration, stop, from) {
                var days = duration.days % (from === 'months' ? 30 : 7);
                return days + Time.pluralize("day", days) + (
                        duration.hours && !stop ? ", " + Time.withHours(duration, true) : ""
                    );
            },

            withHours: function(duration, stop) {
                return duration.hours + Time.pluralize("hour", duration.hours) + (
                        duration.minutes && !stop ? ", " + Time.withMinutes(duration) : ""
                    );
            },

            withMinutes: function(duration) {
                return duration.minutes + Time.pluralize("minute", duration.minutes);
            }

        };

        return Time;

    })

    .directive('duration', ['TimeParser', function(TimeParser) {
        "use strict";
        return {
            restrict: 'AEC',
            link: function(scope, element, attrs) {
                scope.$watch(attrs.duration, function(value) {
                    if (typeof value === "number") {
                        element.html(TimeParser.durationString(value));
                    }
                });
            }
        };
    }]
);