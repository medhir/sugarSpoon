module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      files: ['Gruntfile.js', 'client/*.js']
    },

    sass: {
      dist: {
        files: {
          'css/main.css' : 'css/main.scss'
        }
      }
    },

    watch: {
      scripts: {
        files: ['client/*.js'], 
        tasks: ['jshint']
      }, 
      css: {
        files: 'main.scss', 
        tasks: ['sass']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');

  grunt.registerTask('default', ['jshint', 'sass']);
  grunt.registerTask('sass', ['sass']);
  grunt.registerTask('hint', ['jshint']);
  grunt.registerTask('watch', ['watch']);

};