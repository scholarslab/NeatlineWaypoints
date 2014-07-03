
/**
 * @package     omeka
 * @subpackage  neatline-Waypoints
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */


var WP = (function(WP) {


  /**
   * Respond 200 to a waypoints collection request.
   *
   * @param {Object} response: The response body.
   */
  WP.respondWaypoints200 = function(response) {
    _.each(NL.server.requests, _.bind(function(request) {
      var widget = _.str.include(request.url, 'widget=Waypoints');
      var order  = _.str.include(request.url, 'order=weight');
      if (widget && order) NL.respond200(request, response);
    }, this));
  };


  return WP;


})(WP || {});
