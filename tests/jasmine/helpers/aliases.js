
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */

/**
 * @package     omeka
 * @subpackage  neatline-Waypoints
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */


var _w = (function(_w) {


  /**
   * Shortcut public views.
   */
  _w.aliasNeatline = function() {
    this.vw = {
      WP:     Neatline.Waypoints.__view
    };
  };


  /**
   * Shortcut editor views.
   */
  _w.aliasEditor = function() {
    this.vw = {
      WP:     Neatline.Waypoints.__view,
      WPEDIT: Neatline.Editor.Exhibit.Waypoints.__view
    };
  };


  return _w;


})(_w || {});
