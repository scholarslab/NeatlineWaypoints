
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */

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
    loadFixtures('neatline-partial.html');
    this.loadJsonFixtures();
    NL.__initNeatline();
    this.aliasNeatline();
  };


  /**
   * Load editor application.
   */
  WP.loadEditor = function() {
    loadFixtures('editor-partial.html');
    this.loadJsonFixtures();
    NL.__initEditor();
    this.aliasEditor();
  };


  return WP;


})(WP || {});
