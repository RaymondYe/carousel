'use strict';

module.exports = function(grunt) {

  // Load grnt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Add mozjpeg imagemin class
  var mozjpeg = require('imagemin-mozjpeg');

  // Configurable paths
  var config = {
    app: 'app',
    dist: 'dist'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project Setting
    config: config,
    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= config.dist %>/*',
            '!<%= config.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },
    // Renames files for browser caching purposes
    rev: {
      dist: {
        files: {
          src: [
            '<%= config.dist %>/js/{,*/}*.js',
            '<%= config.dist %>/css/{,*/}*.css',
            '<%= config.dist %>/css/fonts/{,*/}*.*',
            '<%= config.dist %>/*.{ico,png}'
          ]
        }
      }
    },
    useminPrepare: {
      options: {
        dest: '<%= config.dist %>'
      },
      html: '<%= config.app %>/index.html'
    },
    usemin: {
      options: {
        assetsDirs: ['<%= config.dist %>', '<%= config.dist %>/img']
      },
      html: ['<%= config.dist %>/{,*/}*.html'],
      css: ['<%= config.dist %>/css/{,*/}*.css']
    },
    uglify: {
      my_target: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/js/',
          src: '**/*.js',
          dest: '<%= config.dist %>/js'
        }]
      }
    },
    htmlmin: {
      dist: {
        options: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          removeCommentsFromCDATA: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true,
          removeRedundantAttributes: true,
          useShortDoctype: true
        },
        files: [{
          expand: true,
          cwd: '<%= config.dist %>',
          src: '{,*/}*.html',
          dest: '<%= config.dist %>'
        }]
      }
    },
    watch: {
      scripts: {
        files: ['<%= config.app %>/**/*.css', '<%= config.app %>/**/*.js'],
        tasks: ['min', 'minjs']
      },
    },
    // The following *-min tasks produce minified files in the dist folder
    imagemin: {
      dynamic: {
        options: {
          optimizationLevel: 3,
          use: [mozjpeg()]
        },
        files: [{
          expand: true,
          cwd: '<%= config.app %>/img/',
          src: ['**/*.{png,jpg,gif}'],
          dest: '<%= config.dist %>/img'
        }]
      }
    },
    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= config.app %>',
          dest: '<%= config.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            'img/{,*/}*.webp',
            '{,*/}*.html',
            'css/fonts/{,*/}*.*',
            'src/*.mp3'
          ]
        }]
      },
      styles: {
        expand: true,
        dot: true,
        cwd: '<%= config.app %>/css',
        dest: '.tmp/css/',
        src: '{,*/}*.css'
      }
    },
  });

  grunt.registerTask('default', ['watch']);
  grunt.registerTask('build', ['clean:dist', 'useminPrepare', 'copy:styles', 'imagemin', 'copy:dist', 'concat:generated', 'cssmin:generated', 'uglify:generated', 'rev', 'usemin', 'htmlmin'])

};