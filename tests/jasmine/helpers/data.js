
/**
 * @package     omeka
 * @subpackage  neatline-Waypoints
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */


var WP = (function(WP) {


  /**
   * Get DOM collection of waypoint listings.
   *
   * @return {Array}: The DOM collection of <a> elements.
   */
  WP.getWidgetRows = function() {
    return this.v.neatline.$('a.title');
  };


  /**
   * Get waypoints element by record title.
   *
   * @param {String} title: The record title.
   * @return {Array}: The DOM element.
   */
  WP.getWidgetRowByTitle = function(title) {
    var model = this.getWidgetModelByTitle(title);
    return this.v.neatline.$('a[data-id="'+model.id+'"]');
  };


  /**
   * Get the array of models from the waypoints collection.
   *
   * @return {Array}: The models.
   */
  WP.getWidgetModels = function() {
    return Neatline.Waypoints.__controller.view.records.models;
  };


  /**
   * Get waypoints model by record title.
   *
   * @param {String} title: The record title.
   * @return {Array}: The DOM element.
   */
  WP.getWidgetModelByTitle = function(title) {
    return Neatline.Waypoints.__controller.view.records.findWhere({
      title: title
    });
  };


  /**
   * Get DOM collection of waypoints listings in sort form.
   *
   * @return {Array}: The DOM collection of <a> elements.
   */
  WP.getEditorRows = function() {
    return this.v.editor.$('div.alert');
  };


  return WP;


})(WP || {});
