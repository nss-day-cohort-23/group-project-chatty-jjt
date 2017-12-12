module.exports = function (grunt) {
    grunt.initConfig({
        browserify: {
            'dist/bundle.js': ['scripts/main.js']
        },
        jshint: {
            files: ["scripts/**/*.js", "scripts/**/*.json"],
            options: {
                predef: ["document", "console", "this"],
                esnext: true,
                globalstrict: true,
                globals: {},
                browserify: true
            }
        },
        sass: {
            dist: {
                files: {
                    'css/main.css': 'sass/style.scss'
                }
            }
        }, 
        watch: {
            javascripts: {
                files: ["scipts/**/*.js", "scripts/**/*.json"],
                tasks: ["jshint", "browserify", "sass"]
            },
        }
    });

    require("matchdep")
        .filter("grunt-*")
        .forEach(grunt.loadNpmTasks);

    grunt.registerTask("default", ['jshint', 'sass', 'browserify', 'watch']);
};