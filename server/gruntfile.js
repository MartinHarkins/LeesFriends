module.exports = function(grunt) {
  "use strict";

  grunt.initConfig({
    copy: {
      build: {
        files: [
          {
            expand: true,
            cwd: "./public",
            src: ["**"],
            dest: "./dist/public"
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
        files: ["src/\*\*/\*.ts"],
        tasks: ["ts"]
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-ts");

  grunt.registerTask("default", [
    "copy",
    "ts"
  ]);

};

