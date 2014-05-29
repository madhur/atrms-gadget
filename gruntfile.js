module.exports = function(grunt)
{
    grunt.initConfig(
    {
        pkg: grunt.file.readJSON('package.json'),

        clean:
        {
            all:
            {
                src: ["build/**"]
            }
        },

        // COPY DEV CODE INTO BUILD
        copy:
        {

            main:
            {
                files:
                {
                    'build/': ['**', '!node_modules/**', '!package.json', '!README.md', '!gruntfile.js']
                }

            }
        },


        cssmin:
        {
            css:
            {
                src: 'build/css/main.css',
                dest: 'build/css/main.css',

            },

             
            css1:{
                src: 'build/css/options-widgets.css',
                dest: 'build/css/options-widgets.css',

            },

            css2: {
                src: 'build/css/options.css',
                dest: 'build/css/options.css',

            }



        },






        uglify:
        {
            js:
            {
                files:
                {
                    'build/js/core.js': ['build/js/core.js'],
                    'build/js/atrms.api.js': ['build/js/atrms.api.js'],
                     'build/js/options.js': ['build/js/options.js'],
                     'build/js/options-setup.js': ['build/js/options-setup.js']

                }
            }
        },



        compress:
        {
            main:
            {
                options:
                {
                    archive: 'build/archive.zip',
                    mode: 'zip'


                },
                files: [
                    {
                        cwd: 'build/',
                        src: ['**'],
                        dest: ''
                    }, // includes files in path
                ]
            }
        }
    });




    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-rename');
    grunt.registerTask('default', ['clean', 'copy', 'cssmin', 'uglify', 'compress']);
    grunt.registerTask('clear', ['clean']);

};