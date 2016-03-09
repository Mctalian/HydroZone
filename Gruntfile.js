module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            options: {
                reporter: require('jshint-stylish')
            },

            build: ['Gruntfile.js']
        }
    });

    // LOAD GRUNT PACKAGES
    grunt.loadNpmTasks('grunt-contrib-jshint');
};
