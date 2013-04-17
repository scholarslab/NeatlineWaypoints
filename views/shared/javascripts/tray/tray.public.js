
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */

/**
 * Item tray public API.
 *
 * @package     omeka
 * @subpackage  neatline
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

Neatline.module('ItemTray', function(
  ItemTray, Neatline, Backbone, Marionette, $, _) {


  /**
   * Load records active on the item tray, ordered by weight.
   */
  var load = function() {

    var params = {
      widget: 'ItemTray', order: 'weight'
    };

    ItemTray.__collection.update(params, function(records) {
      ingest(records);
    });

  };
  Neatline.commands.setHandler('ITEMTRAY:load', load);
  Neatline.vent.on('refresh', load);


  /**
   * Render a records collection in the list.
   *
   * @param {Object} records: The collection of records.
   */
  var ingest = function(records) {
    ItemTray.__view.ingest(records);
  };
  Neatline.commands.setHandler('ITEMTRAY:ingest', ingest);


});
