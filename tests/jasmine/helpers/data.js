
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */

/**
 * @package     omeka
 * @subpackage  neatline-Waypoints
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */


var _w = (function(_w) {


  /**
   * Get DOM collection of waypoint listings.
   *
   * @return {Array}: The DOM collection of <a> elements.
   */
  _w.getRows = function() {
    return this.vw.WP.$('a.title');
  };


  /**
   * Get DOM collection of waypoints listings in sort form.
   *
   * @return {Array}: The DOM collection of <a> elements.
   */
  _w.getEditorRows = function() {
    return this.vw.WPEDIT.$('div.alert');
  };


  /**
   * Get the array of models from the waypoints collection.
   *
   * @return {Array}: The models.
   */
  _w.getModels = function() {
    return Neatline.Waypoints.__collection.models;
  };


  return _w;


})(_w || {});
