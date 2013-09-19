module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.initConfig({
    appfile: '',

    jshint: {
      files: ['app/assets/js/app.js']
    },

    concat: {
      js: {
        src: ['lib/intro.js',
              'lib/app.js',
              'lib/services.js',
              'lib/controllers.js',
              'lib/outro.js'],
        dest: 'app/assets/js/app.js',
        nonull: true
      }
    },

    sass: {
      build: {
        options: {
          style: 'compressed'
        },

        files: {
          'app/assets/css/style.css' : 'app/assets/sass/style.scss'
        }
      },

      debug: {
        options: {
          style: 'expanded'
        },
        files: {
          'app/assets/css/style.css' : 'app/assets/sass/style.scss'
        }
      }
    },

    connect: {
      server: {
        options: {
          port: 9000,
          base: 'app/',
          keepalive: true
        }
      }
    },
  });

  grunt.registerTask('default', [
    'concat',
    'jshint',
    'sass:build'
  ]);

  grunt.registerTask('serve', [
    'concat',
    'jshint',
    'sass:debug',
    'connect'
  ]);

};
