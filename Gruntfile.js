module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    execute: {
      sounds: {
        src: ['script/base64encode.js']
      }
    },
    jsbeautifier: {
      sounds: {
        src: ['src/sounds.js']
      },
      default: {
        src: ['dist/twochainzify.js']
      },
      options: {
        js: {
          indentSize: 2
        }
      }
    },
    concat: {
      options: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %>\n' +
                ' *! Copyright <%= grunt.template.today("yyyy") %> Dana Silver <dsilver1221@gmail.com>\n' +
                ' *! Released under the MIT License\n' +
                ' */\n'
      },
      dist: {
        src: ['src/header.js', 'src/sounds.js', 'src/main.js', 'src/footer.js'],
        dest: 'dist/twochainzify.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= concat.options.banner %>',
        sourceMap: true
      },
      dist_min: {
        files: {
          'dist/twochainzify.min.js': ['dist/twochainzify.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-execute');
  grunt.loadNpmTasks('grunt-jsbeautifier');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('sounds', ['execute:sounds', 'jsbeautifier:sounds']);
  grunt.registerTask('dist', ['concat', 'jsbeautifier:default', 'uglify']);
  grunt.registerTask('default', ['concat', 'jsbeautifier:default']);

}