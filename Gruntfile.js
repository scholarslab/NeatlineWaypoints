
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

  var nlCfg = grunt.file.readJSON('../Neatline/config.json');
  var cfg = grunt.file.readJSON('./config.json');

  grunt.initConfig({

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
      neatline: {
        src: [
          './Neatline/'+nlCfg.payloads.shared.js+'/neatline.js',
          cfg.payloads.shared.js+'/tray.js'
        ],
        options: {
          specs: cfg.jasmine+'/suites/public/**/*.spec.js'
        }
      }
    }

  });

  grunt.registerTask('build', ['symlink']);
  grunt.registerTask('compile', ['concat', 'stylus']);
  grunt.registerTask('compile:min', ['uglify', 'stylus']);

};
