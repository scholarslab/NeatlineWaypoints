
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */

/**
 * State management helpers.
 *
 * @package     omeka
 * @subpackage  neatline
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */


var _tray = (function(_tray) {


  /**
   * Load neatline application.
   */
  _tray.loadNeatline = function() {
    this.loadJsonFixtures();
    _t.loadNeatline();
    this.aliasNeatline();
  };


  /**
   * Load editor application.
   */
  _tray.loadEditor = function() {
    this.loadJsonFixtures();
    _t.loadEditor();
    this.aliasEditor();
  };


  return _tray;


})(_tray || {});
