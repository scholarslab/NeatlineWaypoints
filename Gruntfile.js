
/**
 * @package     omeka
 * @subpackage  neatline-Waypoints
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  var pkg     = grunt.file.readJSON('package.json');
  var nlPaths = grunt.file.readJSON('../Neatline/paths.json');
  var paths   = grunt.file.readJSON('paths.json');

  grunt.initConfig({

    symlink: {

      neatline: {
        link: 'Neatline',
        target: '../Neatline',
        options: {
          overwrite: true
        }
      }

    },

    connect: {

      server: {
        options: {
          keepalive: true,
          port: 1337
        }
      }

    },

    clean: {

      dist: [
        paths.dist.js.shared,
        paths.dist.css.shared
      ],

      fixtures: [
        paths.jasmine+'/fixtures/*.json',
        paths.jasmine+'/fixtures/*.html'
      ],

      pkg: 'pkg'

    },

    concat: {

      waypoints_public: {
        src: paths.src.js.shared+'/public/*.js',
        dest: paths.dist.js.shared+'/waypoints-public.js'
      },

      waypoints_editor: {
        src: [
          '<%= concat.waypoints_public.src %>',
          paths.src.js.shared+'/editor/*.js'
        ],
        dest: paths.dist.js.shared+'/waypoints-editor.js'
      },

      waypoints_editor_css: {
        src: [
          paths.dist.css.shared+'/waypoints-public.css',
          paths.dist.css.shared+'/waypoints-editor.css',
        ],
        dest: paths.dist.css.shared+'/waypoints-editor.css'
      }

    },

    uglify: {

      waypoints_public: {
        src: '<%= concat.waypoints_public.dest %>',
        dest: paths.dist.js.shared+'/waypoints-public.js'
      },

      waypoints_editor: {
        src: '<%= concat.waypoints_editor.dest %>',
        dest: paths.dist.js.shared+'/waypoints-editor.js'
      }

    },

    stylus: {

      waypoints_public: {
        src: paths.src.styl.shared+'/public/*.styl',
        dest: paths.dist.css.shared+'/waypoints-public.css'
      },

      waypoints_editor: {
        src: paths.src.styl.shared+'/editor/*.styl',
        dest: paths.dist.css.shared+'/waypoints-editor.css'
      }

    },

    watch: {
      payload: {
        files: [
          '<%= concat.waypoints_public.src %>',
          '<%= concat.waypoints_editor.src %>',
          paths.src.styl.shared+'/**/*.styl'
        ],
        tasks: ['compile']
      }
    },

    phpunit: {

      options: {
        bin: 'Neatline/vendor/bin/phpunit',
        bootstrap: 'tests/phpunit/bootstrap.php',
        followOutput: true,
        colors: true
      },

      application: {
        dir: 'tests/phpunit'
      }

    },

    jasmine: {

      options: {
        template: 'Neatline/'+nlPaths.jasmine+'/runner.tmpl',
        helpers: [
          'Neatline/'+nlPaths.jasmine+'/dist/vendor.js',
          paths.jasmine+'/helpers/*.js'
        ]
      },

      neatline: {
        src: [
          'Neatline/'+nlPaths.dist.js.shared+'/neatline-public.js',
          paths.dist.js.shared+'/waypoints-public.js'
        ],
        options: {
          specs: paths.jasmine+'/tests/neatline/**/*.spec.js'
        }
      },

      editor: {
        src: [
          'Neatline/'+nlPaths.dist.js.shared+'/neatline-editor.js',
          paths.dist.js.shared+'/waypoints-editor.js'
        ],
        options: {
          specs: paths.jasmine+'/tests/editor/**/*.spec.js'
        }
      }

    },

    compress: {

      dist: {
        options: {
          archive: 'pkg/NeatlineWaypoints-'+pkg.version+'.zip'
        },
        dest: 'NeatlineWaypoints/',
        src: [

          '**',

          // GIT
          '!.git/**',

          // BOWER
          '!bower.json',
          '!bower_components/**',

          // NPM
          '!package.json',
          '!node_modules/**',

          // GRUNT
          '!.grunt/**',
          '!Gruntfile.js',
          '!paths.json',

          // SYMLINK
          '!Neatline/**',

          // DIST
          '!pkg/**',

          // TESTS
          '!tests/**'

        ]
      }
    }

  });

  // Run tests.
  grunt.registerTask('default', 'test');

  // Build the application.
  grunt.registerTask('build', [
    'clean',
    'symlink',
    'compile'
  ]);

  // Assemble static assets.
  grunt.registerTask('compile', [
    'stylus',
    'concat'
  ]);

  // Assemble/min static assets.
  grunt.registerTask('compile:min', [
    'compile',
    'uglify',
  ]);

  // Run all tests.
  grunt.registerTask('test', [
    'compile:min',
    'clean:fixtures',
    'phpunit',
    'jasmine'
  ]);

  // Mount public Jasmine suite.
  grunt.registerTask('jasmine:neatline:server', [
    'jasmine:neatline:build',
    'connect'
  ]);

  // Mount editor Jasmine suite.
  grunt.registerTask('jasmine:editor:server', [
    'jasmine:editor:build',
    'connect'
  ]);

  // Spawn release package.
  grunt.registerTask('package', [
    'clean:pkg',
    'compile:min',
    'compress'
  ]);

};
