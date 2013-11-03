
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=80; */

/**
 * @package     omeka
 * @subpackage  neatline-Waypoints
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

Neatline.module('Waypoints', function(Waypoints) {


  Waypoints.Controller = Neatline.Shared.Controller.extend({


    slug: 'WAYPOINTS',

    events: [
      { 'refresh': 'load' },
      'highlight',
      'unhighlight',
      'select',
      'unselect',
      'setFilter',
      'removeFilter'
    ],


    /**
     * Create the view, load starting records.
     */
    init: function() {
      this.view = new Waypoints.View({ slug: this.slug });
      this.load();
    },


    /**
     * Load waypoint records, ordered by weight.
     */
    load: function() {
      this.view.load();
    },


    /**
     * Highlight a listing.
     *
     * @param {Object} args: Event arguments.
     */
    highlight: function(args) {
      this.view.renderHighlight(args.model);
    },


    /**
     * Unhighlight a listing.
     *
     * @param {Object} args: Event arguments.
     */
    unhighlight: function(args) {
      this.view.renderUnhighlight(args.model);
    },


    /**
     * Select tagged a listing.
     *
     * @param {Object} args: Event arguments.
     */
    select: function(args) {
      this.view.renderSelect(args.model);
      this.view.scrollTo(args.model);
      this.unhighlight(args);
    },


    /**
     * Unselect a listing.
     *
     * @param {Object} args: Event arguments.
     */
    unselect: function(args) {
      this.view.renderUnselect(args.model);
      this.unhighlight(args);
    },


    /**
     * Set a record filter.
     *
     * @param {Object} args: Event arguments.
     */
    setFilter: function(args) {
      this.view.setFilter(args.key, args.evaluator);
    },


    /**
     * Remove a record filter.
     *
     * @param {Object} args: Event arguments.
     */
    removeFilter: function(args) {
      this.view.removeFilter(args.key);
    }


  });


});
