
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */

/**
 * @package     omeka
 * @subpackage  neatline-Waypoints
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

Neatline.module('Waypoints', function(
  Waypoints, Neatline, Backbone, Marionette, $, _) {


  this.ID = 'WAYPOINTS';


  this.addInitializer(function() {
    this.__collection = new Neatline.Shared.Record.Collection();
    this.__view = new Waypoints.View();
    Neatline.execute('WAYPOINTS:load');
  });


});
