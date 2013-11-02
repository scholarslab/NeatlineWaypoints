
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=80; */

/**
 * @package     omeka
 * @subpackage  neatline-Waypoints
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

Neatline.module('Editor.Exhibit.Waypoints', function(Waypoints) {


  Waypoints.Router = Neatline.Shared.Router.extend({


    routes: {
      waypoints: 'waypoints'
    },


    /**
     * Show the waypoints sorting form.
     */
    waypoints: function() {

      Neatline.execute('EDITOR:display', [
        'EDITOR:EXHIBIT',
        'EDITOR:WAYPOINTS'
      ]);

      Neatline.execute(
        'EDITOR:EXHIBIT:activateTab', 'waypoints'
      );

    }


  });


});
