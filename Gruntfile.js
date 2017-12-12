module.exports = function (grunt) {
    grunt.initConfig({
        browserify: {
            'dist/bundle.js': ['scripts/main.js']
        },
        jshint: {
            files: ["scripts/**/*.js", "scripts/**/*.json"],
            options: {
                predef: ["document", "console"],
                esnext: true,
                globalstrict: true,
                globals: {},
                browserify: true
            }
        },
       
        watch: {
            javascripts: {
                files: ["javascripts/**/*.js", "javascripts/**/*.json"],
                tasks: ["jshint", "browserify"]
            },
        }
    });

    require("matchdep")
        .filter("grunt-*")
        .forEach(grunt.loadNpmTasks);

    grunt.registerTask("default", ['jshint', 'browserify', 'watch']);
};