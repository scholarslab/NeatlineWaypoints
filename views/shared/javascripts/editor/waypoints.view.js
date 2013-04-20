
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */

/**
 * @package     omeka
 * @subpackage  neatline-Waypoints
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

Neatline.module('Editor.Exhibit.Waypoints', function(
  Waypoints, Neatline, Backbone, Marionette, $, _) {


  Waypoints.View = Backbone.Neatline.View.extend({


    template:   '#waypoints-form-template',
    className:  'form-stacked waypoints',
    tagName:    'form',

    events: {
      'click a[name="save"]': 'save'
    },

    ui: {
      sort: 'div.sort'
    },


    /**
     * Compile the records template.
     */
    init: function() {

      Waypoints.View.__super__.init.apply(this);

      // Compile template.
      this.list = _.template(
        $('#waypoints-editor-list-template').html()
      );

    },


    /**
     * Render a list of records.
     *
     * @param {Object} records: The records collection.
     */
    ingest: function(records) {
      this.__ui.sort.html(this.list({ records: records }));
      this.__ui.sort.sortable();
    },


    /**
     * Save the order.
     */
    save: function() {

      // Gather order from jQuery UI.
      var order = this.__ui.sort.sortable('toArray', {
        attribute: 'data-id'
      });

      // Update weights.
      $.ajax({
        data:     { order: order },
        url:      Neatline.global.waypoints_api,
        success:  _.bind(this.onSaveSuccess, this),
        error:    _.bind(this.onSaveError, this),
        type:     'POST'
      });

    },


    /**
     * When a save succeeds.
     */
    onSaveSuccess: function() {
      Neatline.vent.trigger('refresh')
      Neatline.execute('EDITOR:notifySuccess',
        WP_STRINGS.order.save.success
      );
    },


    /**
     * When a save fails.
     */
    onSaveError: function() {
      Neatline.execute('EDITOR:notifyError',
        WP_STRINGS.order.save.error
      );
    }


  });


});
