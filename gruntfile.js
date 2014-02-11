module.exports = function(grunt) {

  var config = {

    /* Meta Data
        ---------------------------------------------- */
    pkg: grunt.file.readJSON('package.json'),
  
    //compile sass files

    compass: {                  // Task
      dist: {                   // Target
        options: {              // Target options
          sassDir: 'sass',
          cssDir: 'css',
          environment: 'production',
          specify: ['sass/main.scss','sass/main-themed.scss', '!sass/utilities/*.scss']
        }
      },
      dev: {                    // Another target
        options: {
          sassDir: 'sass',
          cssDir: 'css',
          specify: ['sass/main.scss','sass/main-themed.scss', '!sass/utilities/*.scss']
        }
      }
    },
    //merge js files
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['js/**/*.js','!js/libs/**/*.js'],
        dest: 'dist/built.js',
      },
    },
    //minify js files
    uglify: {
      my_target: {
        files: {
          'dist/output.min.js': ['dist/built.js']
        }
      }
    },
    open:{
      dev : {
        path: 'http://127.0.0.1:8888/my-boilerplate/',
        app: 'Google Chrome'
      }
    },
    watch:{
      css:{
        files :['**/*.scss'],
        tasks:['compass']
      },
      js:{
        files:['js/**/*.js'],
        tasks:['concat', 'uglify']
      },
      html:{
        files:['**/*.html', '**/*.shtml']
      },
      jade:{
        files: ['jade/**/*.jade'],
        tasks: ['jade']
      },
      options:{
        livereload: true
      }
    },
    jade: {
      debug: {
        options: {
          data: {
            debug: true,
            timestamp: "<%= grunt.template.today() %>"
          }
        },
        // files: {
        //   "index.html": "jade/index.jade"
        // }
        
      },
      compile: {
          expand: true,
          cwd:"jade/pages",
          src: ["**/*.jade"],
          dest: "./",
          ext: ".html"
        }
    }
    // jade: {
      // compile: {
      //   expand: true,
      //   cwd: "jade/pages",
      //   src: ["**/*.jade"],
      //   dest: "./",
      //   ext: ".html"
      // }
    // }
    
  };

  grunt.loadNpmTasks('grunt-contrib');
  grunt.loadNpmTasks('grunt-open');

  grunt.registerTask('default', ['compass','concat','uglify','open', 'watch']);

  grunt.initConfig(config);
};