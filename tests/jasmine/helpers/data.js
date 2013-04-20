
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */

/**
 * @package     omeka
 * @subpackage  neatline-Waypoints
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */


var WP = (function(WP) {


  /**
   * Get DOM collection of waypoint listings.
   *
   * @return {Array}: The DOM collection of <a> elements.
   */
  WP.getRows = function() {
    return this.vw.WP.$('a.title');
  };


  /**
   * Get DOM collection of waypoints listings in sort form.
   *
   * @return {Array}: The DOM collection of <a> elements.
   */
  WP.getEditorRows = function() {
    return this.vw.WPEDIT.$('div.alert');
  };


  /**
   * Get the array of models from the waypoints collection.
   *
   * @return {Array}: The models.
   */
  WP.getModels = function() {
    return Neatline.Waypoints.__collection.models;
  };


  return WP;


})(WP || {});
