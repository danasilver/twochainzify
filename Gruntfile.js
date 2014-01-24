module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    execute: {
      sounds: {
        src: ['script/base64encode.js']
      }
    },
    jsbeautifier: {
      default: {
        src: ['src/sounds.js']
      },
      options: {
        js: {
          indentSize: 2
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-execute');
  grunt.loadNpmTasks('grunt-jsbeautifier');

  grunt.registerTask('sounds', ['execute:sounds', 'jsbeautifier']);
}