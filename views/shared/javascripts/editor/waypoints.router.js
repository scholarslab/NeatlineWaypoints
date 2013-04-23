
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */

/**
 * @package     omeka
 * @subpackage  neatline-Waypoints
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

Neatline.module('Editor.Exhibit.Waypoints', function(
  Waypoints, Neatline, Backbone, Marionette, $, _) {


  this.Router = Neatline.Editor.Router.extend({


    routes: {
      waypoints: 'waypoints'
    },


    /**
     * Show the waypoints sorting form.
     */
    waypoints: function() {
      Neatline.execute('E:display', ['E:EXHIBIT', 'E:WAYPOINTS']);
      Neatline.execute('E:EXHIBIT:activateTab', 'waypoints');
    }


  });


});
