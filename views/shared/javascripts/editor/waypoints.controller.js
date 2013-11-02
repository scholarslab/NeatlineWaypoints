
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=80; */

/**
 * @package     omeka
 * @subpackage  neatline-Waypoints
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

Neatline.module('Editor.Exhibit.Waypoints', function(Waypoints) {


  Waypoints.Controller = Neatline.Shared.Controller.extend({


    slug: 'EDITOR:WAYPOINTS',

    commands: ['display'],


    /**
     * Create the router and view.
     */
    init: function() {
      this.router = new Waypoints.Router();
      this.view = new Waypoints.View({ slug: this.slug });
    },


    /**
     * Display the form and update the sorting list.
     *
     * @param {Object} container: The container element.
     */
    display: function(container) {
      this.view.showIn(container);
      this.view.load()
    }


  });


});
