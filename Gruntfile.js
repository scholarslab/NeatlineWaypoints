
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */

/**
 * Gruntfile.
 *
 * @package     omeka
 * @subpackage  neatline-SIMILE
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
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-symbolic-link');
  grunt.loadNpmTasks('grunt-shell');

  var nlCfg = grunt.file.readJSON('../Neatline/config.json');
  var cfg = grunt.file.readJSON('./config.json');

  grunt.initConfig({

    shell: {
      options: {
        stdout: true
      },
      phpunit: {
        command: 'phpunit --color',
        options: {
          execOptions: {
            cwd: './tests/phpunit'
          }
        }
      }
    },

    symlink: {
      neatline: {
        link: './Neatline',
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
        cfg.payloads.shared.js,
        cfg.payloads.shared.css
      ]
    },

    concat: {
      tray: {
        src: cfg.src.shared+'/*.js',
        dest: cfg.payloads.shared.js+'/tray.js'
      }
    },

    uglify: {
      tray: {
        src: '<%= concat.tray.src %>',
        dest: cfg.payloads.shared.js+'/tray.js'
      }
    },

    stylus: {
      compile: {
        files: {
          './views/shared/css/payloads/tray.css':
            cfg.stylus.shared+'/*.styl'
        }
      }
    },

    watch: {
      payload: {
        files: [
          '<%= concat.tray.src %>',
          cfg.stylus.shared+'/*.styl'
        ],
        tasks: ['concat', 'stylus']
      }
    },

    jasmine: {

      options: {
        helpers: [
          './Neatline/'+nlCfg.jasmine+'/helpers/*.js',
          './Neatline/'+nlCfg.jasmine+'/assertions/*.js',
          './Neatline/'+nlCfg.vendor.js.jasmine_jquery,
          './Neatline/'+nlCfg.vendor.js.sinon,
          cfg.jasmine+'/helpers/*.js'
        ]
      },

      neatline: {
        src: [
          './Neatline/'+nlCfg.payloads.shared.js+'/neatline.js',
          cfg.payloads.shared.js+'/tray.js'
        ],
        options: {
          specs: cfg.jasmine+'/suites/public/**/*.spec.js'
        }
      },

      editor: {
        src: [
          './Neatline/'+nlCfg.payloads.shared.js+'/editor.js',
          cfg.payloads.shared.js+'/tray.js'
        ],
        options: {
          specs: cfg.jasmine+'/suites/editor/**/*.spec.js'
        }
      }

    }

  });

  // Run tests by default.
  grunt.registerTask('default', 'test');

  // Symlink Neatline.
  grunt.registerTask('build', ['symlink']);

  // Assemble static assets.
  grunt.registerTask('compile', ['concat', 'stylus']);

  // Assemble/min static assets.
  grunt.registerTask('compile:min', ['uglify', 'stylus']);

  // Run all tests.
  grunt.registerTask('test', ['shell:phpunit', 'jasmine']);

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

};
