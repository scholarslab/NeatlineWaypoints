
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */

/**
 * @package     omeka
 * @subpackage  neatline-Waypoints
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

Neatline.module('Editor.Exhibit.Waypoints', function(
  Waypoints, Neatline, Backbone, Marionette, $, _) {


  /**
   * Display the form and update the sorting list.
   *
   * @param {Object} container: The container element.
   */
  var display = function(container) {

    Waypoints.__view.showIn(container);

    var params = {
      widget: 'waypoints', order: 'weight'
    };

    Waypoints.__collection.update(params, function(records) {
      Waypoints.__view.ingest(records);
    });

  };
  Neatline.commands.setHandler(this.ID+':display', display);


});
