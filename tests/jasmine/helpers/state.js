
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */

/**
 * @package     omeka
 * @subpackage  neatline-Waypoints
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */


var _w = (function(_w) {


  /**
   * Load neatline application.
   */
  _w.loadNeatline = function() {
    loadFixtures('neatline-partial.html');
    this.loadJsonFixtures();
    _t.__initNeatline();
    this.aliasNeatline();
  };


  /**
   * Load editor application.
   */
  _w.loadEditor = function() {
    loadFixtures('editor-partial.html');
    this.loadJsonFixtures();
    _t.__initEditor();
    this.aliasEditor();
  };


  return _w;


})(_w || {});
