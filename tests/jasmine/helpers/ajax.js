
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */

/**
 * Ajax mocking helpers.
 *
 * @package     omeka
 * @subpackage  neatline
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */


var _tray = (function(_tray) {


  /**
   * Respond 200 to a record list collection request.
   *
   * @param {Object} response: The response body.
   */
  _tray.respondItemTray200 = function(response) {
    _.each(_t.server.requests, _.bind(function(request) {

      // Check for `widget` and `order` GET parameters.
      var widget  = _.str.include(request.url, 'widget=ItemTray');
      var order   = _.str.include(request.url, 'order=weight');

      if (widget && order) _t.respond200(request, response);

    }, this));
  };


  return _tray;


})(_tray || {});
