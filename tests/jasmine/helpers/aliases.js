
/**
 * @package     omeka
 * @subpackage  neatline-Waypoints
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */


var WP = (function(WP) {


  /**
   * Shortcut public views.
   */
  WP.aliasNeatline = function() {
    this.v = {
      neatline: Neatline.Waypoints.__controller.view
    };
  };


  /**
   * Shortcut editor views.
   */
  WP.aliasEditor = function() {
    this.v = {
      neatline: Neatline.Waypoints.__controller.view,
      editor:   Neatline.Editor.Exhibit.Waypoints.__controller.view
    };
  };


  return WP;


})(WP || {});
