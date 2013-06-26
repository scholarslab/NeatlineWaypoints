
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */

/**
 * @package     omeka
 * @subpackage  neatline-Waypoints
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

Neatline.module('Waypoints', function(
  Waypoints, Neatline, Backbone, Marionette, $, _) {


  /**
   * Load waypoint records, ordered by weight.
   */
  var load = function() {

    var params = {
      widget: 'Waypoints', order: 'weight'
    };

    Waypoints.__collection.update(params, function(records) {
      ingest(records);
    });

  };
  Neatline.commands.setHandler(Waypoints.ID+':load', load);
  Neatline.vent.on('refresh', load);


  /**
   * Render a records collection in the list.
   *
   * @param {Object} records: The collection of records.
   */
  var ingest = function(records) {
    Waypoints.__view.ingest(records);
  };
  Neatline.commands.setHandler(Waypoints.ID+':ingest', ingest);


  /**
   * Highlight a listing.
   *
   * @param {Object} args: Event arguments.
   */
  var highlight = function(args) {
    Waypoints.__view.renderHighlight(args.model);
  };
  Neatline.commands.setHandler(Waypoints.ID+':highlight', highlight);
  Neatline.vent.on('highlight', highlight);


  /**
   * Unhighlight a listing.
   *
   * @param {Object} args: Event arguments.
   */
  var unhighlight = function(args) {
    Waypoints.__view.renderUnhighlight(args.model);
  };
  Neatline.commands.setHandler(Waypoints.ID+':unhighlight', unhighlight);
  Neatline.vent.on('unhighlight', unhighlight);


  /**
   * Select tagged a listing.
   *
   * @param {Object} args: Event arguments.
   */
  var select = function(args) {
    Waypoints.__view.renderSelect(args.model);
    unhighlight(args);
  };
  Neatline.commands.setHandler(Waypoints.ID+':select', select);
  Neatline.vent.on('select', select);


  /**
   * Unselect a listing.
   *
   * @param {Object} args: Event arguments.
   */
  var unselect = function(args) {
    Waypoints.__view.renderUnselect(args.model);
    unhighlight(args);
  };
  Neatline.commands.setHandler(Waypoints.ID+':unselect', unselect);
  Neatline.vent.on('unselect', unselect);


  /**
   * Set a record filter.
   *
   * @param {Object} args: Event arguments.
   */
  var sFilter = function(args) {
    Waypoints.__view.setFilter(args.key, args.evaluator);
  };
  Neatline.commands.setHandler(Waypoints.ID+':setFilter', sFilter);
  Neatline.vent.on('setFilter', sFilter);


  /**
   * Remove a record filter.
   *
   * @param {Object} args: Event arguments.
   */
  var rFilter = function(args) {
    Waypoints.__view.removeFilter(args.key);
  };
  Neatline.commands.setHandler(Waypoints.ID+':removeFilter', rFilter);
  Neatline.vent.on('removeFilter', rFilter);


});
