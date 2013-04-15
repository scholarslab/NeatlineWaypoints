
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */

/**
 * Item tray initializer.
 *
 * @package     omeka
 * @subpackage  neatline-ItemTray
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

Neatline.module('ItemTray', function(
  ItemTray, Neatline, Backbone, Marionette, $, _) {


  ItemTray.addInitializer(function() {
    this.__view = new ItemTray.View();
  });


});
