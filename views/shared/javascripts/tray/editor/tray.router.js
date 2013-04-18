
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */

/**
 * Item tray editor controller.
 *
 * @package     omeka
 * @subpackage  neatline
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

Neatline.module('Editor.Exhibit.ItemTray', function(
  ItemTray, Neatline, Backbone, Marionette, $, _) {


  ItemTray.Router = Neatline.Editor.Router.extend({


    routes: {
      'item-tray': 'item-tray'
    },


    /**
     * Show the item tray ordering form.
     */
    'item-tray': function() {
      Neatline.execute('EDITOR:display', ['EXHIBIT', 'TRAYEDIT']);
      Neatline.execute('EXHIBIT:activateTab', 'item-tray');
    }


  });


});
