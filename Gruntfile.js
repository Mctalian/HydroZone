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
                push: true,
                pushTo: 'origin',
                gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d'
            }
        },

        jshint: {
            options: {
                esversion: 6,
                reporter: require('jshint-stylish')
            },

            build: ['*.js', 'features/**/*.js', 'public/**/*.js', '!public/lib/**/*.js']
        },

        cucumberjs: {
            options: {
                format: 'html',
                output: 'reports/my_report.html',
                theme: 'bootstrap'
            },
            features: ['features/**/*.feature']
        }
    });

    // LOAD GRUNT PACKAGES
    grunt.loadNpmTasks('grunt-bump');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-cucumberjs');
};
