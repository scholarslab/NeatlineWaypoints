
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
      save: 'a[name="save"]',
      list: 'div.sort'
    },


    /**
     * Compile the records template.
     */
    init: function() {

      Waypoints.View.__super__.init.apply(this);

      // Compile template.
      this.template = _.template(
        $('#waypoints-editor-list-template').html()
      );

      this.__ui.list.sortable();

    },


    /**
     * Render a list of records.
     *
     * @param {Object} records: The records collection.
     */
    ingest: function(records) {

      // Render the record list.
      this.__ui.list.html(this.template({ records: records }));

      // If waypoints exist, enable sorting, refresh the widget to pick up
      // any new waypoints, and enable the "Save" button.

      if (records.length > 0) {
        this.__ui.list.sortable('enable').sortable('refresh');
        this.__ui.save.removeClass('disabled');
      }

      // Otherwise, disable sorting and the "Save" button.

      else {
        this.__ui.list.sortable('disable');
        this.__ui.save.addClass('disabled');
      }

    },


    /**
     * Save the order.
     */
    save: function() {

      // Gather order from jQuery UI.
      var order = this.__ui.list.sortable('toArray', {
        attribute: 'data-id'
      });

      // Update weights.
      $.ajax({
        data:     JSON.stringify(order),
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
