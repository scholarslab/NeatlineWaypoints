
/**
 * @package     omeka
 * @subpackage  neatline-Waypoints
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */


var WP = (function(WP) {


  /**
   * Load neatline application.
   */
  WP.loadNeatline = function() {
    loadFixtures('SharedHtml.exhibit.html');
    NL.__initNeatline();
    this.aliasNeatline();
  };


  /**
   * Load editor application.
   */
  WP.loadEditor = function() {
    loadFixtures('SharedHtml.editor.html');
    NL.__initEditor();
    this.aliasEditor();
  };


  /**
   * Refresh the waypoints widget.
   *
   * @param {Object} response: The response body.
   */
  WP.refreshWidget = function(response) {
    Neatline.vent.trigger('refresh');
    this.respondWaypoints200(response);
  };


  /**
   * Navigate to the waypoints form.
   *
   * @param {Object} response: The response body.
   */
  WP.showForm = function(response) {
    NL.navigate('waypoints');
    NL.respondLast200(response);
  };


  return WP;


})(WP || {});
