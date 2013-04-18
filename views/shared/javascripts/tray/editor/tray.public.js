
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */

/**
 * Item tray editor public API.
 *
 * @package     omeka
 * @subpackage  neatline
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

Neatline.module('Editor.Exhibit.ItemTray', function(
  ItemTray, Neatline, Backbone, Marionette, $, _) {


  /**
   * Load records and append the form to the editor container.
   *
   * @param {Object} container: The container element.
   */
  var display = function(container) {

    var params = {
      widget: 'ItemTray', order: 'weight'
    };

    ItemTray.__collection.update(params, function(records) {
      ItemTray.__view.showIn(container);
      ItemTray.__view.ingest(records);
    });

  };
  Neatline.commands.setHandler('TRAYEDIT:display', display);


});
