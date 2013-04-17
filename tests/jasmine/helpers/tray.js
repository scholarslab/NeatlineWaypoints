
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */

/**
 * Item tray helpers.
 *
 * @package     omeka
 * @subpackage  neatline
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */


var _tray = (function(_tray) {


  /**
   * Get DOM collection of tray record listings.
   *
   * @return {Array}: The DOM collection of <a> elements.
   */
  _tray.getItemTrayRows = function() {
    return this.vw.LIST.$el.find('a.title');
  };


  return _tray;


})(_tray || {});
