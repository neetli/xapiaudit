module.exports = function (grunt) {
  "use strict";

  grunt.initConfig({
    ts: {
      app: {
        files: [{
          src: ["src/**/*.ts", "!src/.baseDir.ts", "!src/_all.d.ts"],
          dest: "./app"
        }],
        options: {
          module: "commonjs",
          noLib: true,
          target: "es6",
          sourceMap: true,
          experimentalDecorators: true,
          rootDir: "./src",
          outDir: "./app"
        }
      }
    },
    tslint: {
      options: {
        configuration: "tslint.json"
      },
      files: {
        src: ["src/**/*.ts"]
      }
    },
    // Configure a mochaTest task
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          captureFile: 'results.txt', // Optionally capture the reporter output to a file
          quiet: false, // Optionally suppress output to standard out (defaults to false)
          clearRequireCache: true, // Optionally clear the require cache before running tests (defaults to false)
          colors: true
        },
        src: ['./app/tests/**/*.js']
      }
    },
    watch: {
      scripts: {
        files: ["src/**/*.ts"],
        tasks: ["ts", "tslint", "express:dev"],
        options: {
          interrupt: true,
          event: ['added', 'deleted', 'changed'],
          spawn: false // for grunt-contrib-watch v0.5.0+, "nospawn: true" for lower versions. Without this option specified express won't be reloaded
        }
      },
      noexpress: {
        files: ["src/**/*.ts"],
        tasks: ["ts", "tslint"],
        options: {
          interrupt: false,
          event: ['added', 'deleted', 'changed'],
          spawn: false // for grunt-contrib-watch v0.5.0+, "nospawn: true" for lower versions. Without this option specified express won't be reloaded
        }
      }
    },
    express: {
      options: {
        // Override defaults here
      },
      dev: {
        options: {
          script: 'bin/www',
          node_env: 'development'
        }
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-ts");
  grunt.loadNpmTasks("grunt-tslint");
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.registerTask("watchts", [
    "ts",
    "tslint",
    "watch:noexpress"
  ]);

  grunt.registerTask("build", [
    "ts",
    "tslint"
  ]);

  grunt.registerTask("buildandtest", [
    "ts",
    "tslint",
    "mochaTest"
  ]);

  grunt.registerTask("default", [
    "ts",
    "tslint",
    "express:dev",
    "watch"
  ]);
};