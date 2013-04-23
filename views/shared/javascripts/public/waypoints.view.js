
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */

/**
 * @package     omeka
 * @subpackage  neatline-Waypoints
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

Neatline.module('Waypoints', function(
  Waypoints, Neatline, Backbone, Marionette, $, _) {


  this.View = Neatline.Shared.Widget.View.extend({


    id: 'waypoints',

    events: {
      'mouseenter a': 'onHighlight',
      'mouseleave a': 'onUnhighlight',
      'click a': 'onSelect'
    },


    /**
     * Compile the records template.
     */
    init: function() {
      this.template = _.template(
        $('#waypoints-public-list-template').html()
      );
    },


    /**
     * Render a list of records.
     *
     * @param {Object} records: The records collection.
     */
    ingest: function(records) {
      this.$el.toggleClass('empty', records.length == 0);
      this.$el.html(this.template({ records: records }));
    },


    /**
     * Highlight presenter on hover.
     *
     * @param {Object} e: The DOM event.
     */
    onHighlight: function(e) {
      Neatline.vent.trigger('highlight', {
        model:  this.getModel(e),
        source: Waypoints.ID
      });
    },


    /**
     * Unhighlight presenter on unhover.
     *
     * @param {Object} e: The DOM event.
     */
    onUnhighlight: function(e) {
      Neatline.vent.trigger('unhighlight', {
        model:  this.getModel(e),
        source: Waypoints.ID
      });
    },


    /**
     * Select when a record is clicked.
     *
     * @param {Object} e: The DOM event.
     */
    onSelect: function(e) {
      Neatline.vent.trigger('select', {
        model:  this.getModel(e),
        source: Waypoints.ID
      });
    },


    /**
     * Get the model for a DOM event.
     *
     * @param {Object} e: The DOM event.
     */
    getModel: function(e) {
      return Waypoints.__collection.get(
        parseInt($(e.currentTarget).attr('data-id'), 10)
      );
    }


  });


});
