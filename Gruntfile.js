module.exports = function(grunt) {
  var mozjpeg = require('imagemin-mozjpeg');
  // initConfig
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['js/intro.js', 'js/project.js', 'js/outro.js'],
        dest: 'dist/built.js',
      },
    },
    uglify: {
      my_target: {
        files: [{
          expand: true,
          cwd: 'js/',
          src: '**/*.js',
          dest: 'dist/js'
        }]
      }
    },
    cssmin: {
      minify: {
        expand: true,
        cwd: 'css/',
        src: ['*.css', '!*.min.css'],
        dest: 'dist/css/'
      }
    },
    watch: {
      scripts: {
        files: ['**/*.css', '**/*.js'],
        tasks: ['min', 'minjs']
      },
    },
    imagemin: {
      dynamic: { // Another target
        options: { // Target options
          optimizationLevel: 3,
          use: [mozjpeg()]
        },
        files: [{
          expand: true, // Enable dynamic expansion
          cwd: 'img/', // Src matches are relative to this path
          src: ['**/*.{png,jpg,gif}'], // Actual patterns to match
          dest: 'dist/' // Destination path prefix
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');


  grunt.registerTask('default', ['watch']);
  grunt.registerTask('minjs', ['uglify']);
  grunt.registerTask('min', ['cssmin']);
  grunt.registerTask('minimg', ['imagemin']);

};