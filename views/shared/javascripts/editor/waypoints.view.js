
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=80; */

/**
 * @package     omeka
 * @subpackage  neatline-Waypoints
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

Neatline.module('Editor.Exhibit.Waypoints', function(Waypoints) {


  Waypoints.View = Neatline.Shared.View.extend({


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
     * Instantiate Sortable, compile the records template.
     *
     * @param {Object} options
     */
    init: function(options) {

      this.slug = options.slug;

      // Compile list template.
      this.template = _.template(
        $('#waypoints-editor-list-template').html()
      );

      // Make list sortable.
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

      // (En/dis)able Sortable, "Save" button.
      if (records.length > 0) this.enableSorting();
      else this.disableSorting();

      // Store collection.
      this.records = records;

    },


    /**
     * Save the order.
     */
    save: function() {

      // Break if collection is empty.
      if (this.records.length == 0) return;

      $.ajax({
        data:     JSON.stringify(this.getOrder()),
        url:      Neatline.g.waypoints.order_api,
        success:  _.bind(this.onSaveSuccess, this),
        error:    _.bind(this.onSaveError, this),
        type:     'POST'
      });

    },


    /**
     * Enable Sortable and the "Save" button.
     */
    enableSorting: function() {
      this.__ui.list.sortable('enable');
      this.__ui.save.removeClass('disabled');
    },


    /**
     * Disable Sortable and the "Save" button.
     */
    disableSorting: function() {
      this.__ui.list.sortable('disable');
      this.__ui.save.addClass('disabled');
    },


    /**
     * Gather the record order as an array of id's.
     */
    getOrder: function() {
      return this.__ui.list.sortable('toArray', {
        attribute: 'data-id'
      });
    },


    /**
     * When a save succeeds.
     */
    onSaveSuccess: function() {

      // Refresh the exhibit.
      Neatline.vent.trigger('refresh', {
        source: this.slug
      })

      // Flash success message.
      Neatline.execute('EDITOR:notifySuccess',
        WP_STRINGS.order.save.success
      );

    },


    /**
     * When a save fails.
     */
    onSaveError: function() {

      // Flash error message.
      Neatline.execute('EDITOR:notifyError',
        WP_STRINGS.order.save.error
      );

    }


  });


});
