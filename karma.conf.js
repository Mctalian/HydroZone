module.exports = function(config) {
    const LIBS = [
        'lib/angular/angular.js',
        'lib/angular-animate/angular-animate.js',
        'lib/angular-aria/angular-aria.js',
        'lib/angular-material/angular-material.js',
        'lib/angular-material/angular-material-mocks.js',
        'lib/angular-messages/angular-messages.js',
        'lib/angular-mocks/angular-mocks.js',
        'lib/angular-ui-router/release/angular-ui-router.js',
        'lib/lodash/lodash.js'
    ];

    const SRC = [
        '*.js',
        'dashboard/**/*.js',
        'home/**/*.js',
        'rachio/**/*.js',
        'toolbar/**/*.js'
    ];

    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: 'public/',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: LIBS.concat(SRC),

        // list of files to exclude
        exclude: [

        ],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: SRC.reduce(function(result, currentItem) {
            var noSpecs = currentItem.replace('*.js', '!(*spec|*.mock).js');
            result[noSpecs] = ['coverage'];
            return result;
        }, {}),

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'coverage'],

        coverageReporter: {
            dir: '../reports/coverage',
            reporters: [
                {type: 'html', subdir: 'report-html'},
                {type: 'lcov', subdir: 'report-lcov'},
                {type: 'text', subdir: 'report-text'},
                {type: 'text-summary', subdir: 'report-text-summary'}
            ]
        },

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true
    });
};
