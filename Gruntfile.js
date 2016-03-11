module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        bump: {
            options: {
                files: ['package.json'],
                updateConfigs: ['pkg'],
                commit: true,
                commitMessage: 'Release v%VERSION%',
                createTag: true,
                tagName: 'v%VERSION%',
                tagMessage: 'Version %VERSION%',
                prereleaseName: 'rc',
                push: true,
                pushTo: 'origin',
                gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d'
            }
        },

        cucumberjs: {
            options: {
                format: 'html',
                output: 'reports/my_report.html',
                theme: 'bootstrap'
            },
            features: ['features/**/*.feature']
        },

        jshint: {
            options: {
                esversion: 6,
                reporter: require('jshint-stylish')
            },

            build: ['*.js', 'features/**/*.js', 'public/**/*.js', '!public/lib/**/*.js', '!public/reports/**/*.js']
        },

        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        }
    });

    // ALIAS TASKS
    grunt.registerTask('test', ['jshint', 'karma', 'cucumberjs']);

    // LOAD GRUNT PACKAGES
    grunt.loadNpmTasks('grunt-bump');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-cucumberjs');
    grunt.loadNpmTasks('grunt-karma');
};
