
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */

/**
 * Component aliasing helpers.
 *
 * @package     omeka
 * @subpackage  neatline
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */


var _tray = (function(_tray) {


  /**
   * Shortcut public views.
   */
  _tray.aliasNeatline = function() {
    this.vw = {
      LIST: Neatline.ItemTray.__view
    };
  };


  /**
   * Shortcut editor views.
   */
  _tray.aliasEditor = function() {
    // TODO
  };


  return _tray;


})(_tray || {});
