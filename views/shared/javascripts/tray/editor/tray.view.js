
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */

/**
 * Item tray editor view.
 *
 * @package     omeka
 * @subpackage  neatline-ItemTray
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

Neatline.module('Editor.Exhibit.ItemTray', function(
  ItemTray, Neatline, Backbone, Marionette, $, _) {


  ItemTray.View = Backbone.Neatline.View.extend({


    template:   '#item-tray-form-template',
    className:  'form-stacked item-tray',
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

      ItemTray.View.__super__.init.apply(this);

      // Compile template.
      this.list = _.template(
        $('#item-tray-editor-list-template').html()
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
        url:      Neatline.global.item_tray_api,
        data:     { 'order[]': order },
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
      // TODO: Flash success.
    },


    /**
     * When a save fails.
     */
    onSaveError: function() {
      // TODO: Flash error.
    }


  });


});
