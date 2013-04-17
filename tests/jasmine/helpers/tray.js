
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


  /**
   * Get the array of models from the item tray collection.
   *
   * @return {Array}: The models.
   */
  _tray.getItemTrayModels = function() {
    return Neatline.ItemTray.__collection.models;
  };


  return _tray;


})(_tray || {});
