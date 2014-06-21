/* global module:false */

module.exports = function(grunt) {
    "use strict";

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-karma');

    grunt.initConfig({

        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js']
        },

        uglify: {
            target: {
                options: {
                    compress: true,
                    mangle: true
                },
                files: {
                    'angular-duration.min.js': ['src/angular-duration.js']
                }
            }
        },

        karma: {
            unit: {
                options: {
                    basePath: '',
                    frameworks: ['jasmine'],
                    files: [
                        'lib/angular/angular.min.js',
                        'lib/angular-mocks/angular-mocks.js',
                        'src/angular-duration.js',
                        'test/DurationSpec.js'
                    ],
                    reporters: ['dots', 'coverage'],
                    preprocessors: {
                        'src/angular-duration.js': 'coverage'
                    },
                    coverageReporter: {
                        type: "lcov",
                        dir: "coverage"
                    },
                    port: 9876,
                    colors: true,
                    autoWatch: false,
                    browsers: ['PhantomJS'],
                    captureTimeout: 60000,
                    singleRun: true,
                    plugins: [
                        'karma-jasmine',
                        'karma-coverage',
                        'karma-phantomjs-launcher'
                    ]
                }
            }
        }
    });

    grunt.registerTask('default', ['jshint', 'karma']);

};