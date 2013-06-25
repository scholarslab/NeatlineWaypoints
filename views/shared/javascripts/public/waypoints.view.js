
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */

/**
 * @package     omeka
 * @subpackage  neatline-Waypoints
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

Neatline.module('Waypoints', function(
  Waypoints, Neatline, Backbone, Marionette, $, _) {


  Waypoints.View = Neatline.Shared.Widget.View.extend({


    id: 'waypoints',

    events: {
      'mouseenter a': 'publishHighlight',
      'mouseleave a': 'publishUnhighlight',
      'click a':      'publishSelect'
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
     * Publish `highlight` when the cursor enters a listing.
     *
     * @param {Object} e: The DOM event.
     */
    publishHighlight: function(e) {
      Neatline.vent.trigger('highlight', {
        source: Waypoints.ID,
        model: this.getModel(e)
      });
    },


    /**
     * Publish `unhighlight` when the cursor leaves a listing.
     *
     * @param {Object} e: The DOM event.
     */
    publishUnhighlight: function(e) {
      Neatline.vent.trigger('unhighlight', {
        source: Waypoints.ID,
        model: this.getModel(e)
      });
    },


    /**
     * Publish `select` when a listing is clicked.
     *
     * @param {Object} e: The DOM event.
     */
    publishSelect: function(e) {
      Neatline.vent.trigger('select', {
        source: Waypoints.ID,
        model: this.getModel(e)
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
