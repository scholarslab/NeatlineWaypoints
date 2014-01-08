
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=80; */

/**
 * @package     omeka
 * @subpackage  neatline-Waypoints
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-symbolic-link');
  grunt.loadNpmTasks('grunt-shell');

  var pkg     = grunt.file.readJSON('package.json');
  var nlPaths = grunt.file.readJSON('../Neatline/paths.json');
  var paths   = grunt.file.readJSON('paths.json');

  grunt.initConfig({

    shell: {

      options: {
        stdout: true
      },

      phpunit: {
        command: 'phpunit --color',
        options: {
          execOptions: {
            cwd: 'tests/phpunit'
          }
        }
      }

    },

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

      payloads: [
        paths.payloads.shared.js,
        paths.payloads.shared.css
      ],

      fixtures: [
        paths.jasmine+'/fixtures/*.json',
        paths.jasmine+'/fixtures/*.html'
      ],

      pkg: 'pkg'

    },

    concat: {

      waypoints_public: {
        src: paths.src.shared+'/public/*.js',
        dest: paths.payloads.shared.js+'/waypoints-public.js'
      },

      waypoints_editor: {
        src: [
          '<%= concat.waypoints_public.src %>',
          paths.src.shared+'/editor/*.js'
        ],
        dest: paths.payloads.shared.js+'/waypoints-editor.js'
      },

      waypoints_editor_css: {
        src: [
          paths.payloads.shared.css+'/waypoints-public.css',
          paths.payloads.shared.css+'/waypoints-editor.css',
        ],
        dest: paths.payloads.shared.css+'/waypoints-editor.css'
      }

    },

    uglify: {

      waypoints_public: {
        src: '<%= concat.waypoints_public.dest %>',
        dest: paths.payloads.shared.js+'/waypoints-public.js'
      },

      waypoints_editor: {
        src: '<%= concat.waypoints_editor.dest %>',
        dest: paths.payloads.shared.js+'/waypoints-editor.js'
      }

    },

    stylus: {

      waypoints_public: {
        src: paths.stylus.shared+'/public/*.styl',
        dest: paths.payloads.shared.css+'/waypoints-public.css'
      },

      waypoints_editor: {
        src: paths.stylus.shared+'/editor/*.styl',
        dest: paths.payloads.shared.css+'/waypoints-editor.css'
      }

    },

    watch: {
      payload: {
        files: [
          '<%= concat.waypoints_public.src %>',
          '<%= concat.waypoints_editor.src %>',
          paths.stylus.shared+'/**/*.styl'
        ],
        tasks: ['compile']
      }
    },

    jasmine: {

      options: {
        template: 'Neatline/'+nlPaths.jasmine+'/runner.tmpl',
        helpers: [
          'Neatline/'+nlPaths.vendor.js.jasmine_jquery,
          'Neatline/'+nlPaths.vendor.js.sinon,
          'Neatline/'+nlPaths.jasmine+'/helpers/*.js',
          'Neatline/'+nlPaths.jasmine+'/assertions/*.js',
          paths.jasmine+'/helpers/*.js'
        ]
      },

      neatline: {
        src: [
          'Neatline/'+nlPaths.payloads.shared.js+'/neatline-public.js',
          paths.payloads.shared.js+'/waypoints-public.js'
        ],
        options: {
          specs: paths.jasmine+'/tests/neatline/**/*.spec.js'
        }
      },

      editor: {
        src: [
          'Neatline/'+nlPaths.payloads.shared.js+'/neatline-editor.js',
          paths.payloads.shared.js+'/waypoints-editor.js'
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
    'clean:fixtures',
    'phpunit',
    'jasmine'
  ]);

  // Run PHPUnit.
  grunt.registerTask('phpunit', 'shell:phpunit');

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
