module.exports = function (grunt) {
    "use strict";

    grunt.initConfig({
        copy: {
            dev: {
                files: [
                    {
                        expand: true,
                        cwd: "./src/public",
                        src: ["**"],
                        dest: "./dist/public"
                    },
                    {
                        src: "./config/dev.config.json",
                        dest: "./dist/config/config.json"
                    },
                    {
                        expand: true,
                        cwd: "./client/dist",
                        src: ["**"],
                        dest: "./dist/client"
                    }
                ]
            },
            prod: {
                files: [
                    {
                        expand: true,
                        cwd: "./src/public",
                        src: ["**"],
                        dest: "./dist/public"
                    },
                    {
                        src: "./config/prod.config.json",
                        dest: "./dist/config/config.json"
                    }
                ]
            }
        },
        ts: {
            app: {
                files: [{
                    src: ["src/\*\*/\*.ts", "!src/.baseDir.ts"],
                    dest: "./dist"
                }],
                options: {
                    module: "commonjs",
                    target: "es6",
                    sourceMap: false
                }
            }
        },
        watch: {
            ts: {
                files: [
                    "src/\*\*/\*.ts",
                    "config/\*.json"
                ],
                tasks: ["ts"]
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-ts");

    grunt.registerTask("default", [
        "copy:dev",
        "ts"
    ]);

};

