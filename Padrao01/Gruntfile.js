module.exports = function(grunt) {
  grunt.initConfig({

    sass: {
     dist: {
      files: [{'app/src/styles/css/main.css':'app/src/styles/scss/main.scss'}]
    }
  },
  watch: {
   options: {
    livereload: true,
  },
  js: {
   files: "app/src/scripts/**/*.js"
 },
 sass: {
   files: "app/src/styles/scss/**/*.{scss,sass}",
   tasks: ["sass"]
 },
 html: {
   files: "app/src/**/*.html"
 }
},
connect: {
 server: {
  options: {
   port: 9000,
   hostname: "localhost",
   livereload: true,
   open: true
 }
}
},
copy: {
 main: {
   files: [
   {expand: true, flatten: true, src: ['app/src/img/*'], dest: 'dist/img'},
   ],
 },
},
uglify: {
  my_target: {
    files: {
      'dist/scripts/app.min.js': ['app/src/scripts/*.js']
    }
  }
},
cssmin: {
  target: {
    files: [{
     'dist/styles/main.min.css': ['app/src/styles/css/*.css']
   }]
 }
},
htmlmin: {                                    
  dist: {                                   
    options: {                                
      removeComments: true,
      collapseWhitespace: true
    },
    files: {                                 
      'dist/index.html': 'app/src/index.html',
      'dist/templates/*.html': 'app/src/templates/*.html'
    }
  }
},
'http-server': {
  'dev': {
    root: "dist/",
    port: 8000,
    host: "127.0.0.1",
    openBrowser : true,
  }
}
});

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-http-server');


  grunt.registerTask('serve', [ "http-server"]);
  
  grunt.registerTask('compile', ["copy","htmlmin","cssmin","uglify"]);
  
  grunt.registerTask('dev', [ "connect", "watch" ]);
};