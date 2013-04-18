
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */

/**
 * Item tray editor view.
 *
 * @package     omeka
 * @subpackage  neatline
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

Neatline.module('Editor.Exhibit.ItemTray', function(
  ItemTray, Neatline, Backbone, Marionette, $, _) {


  ItemTray.View = Backbone.Neatline.View.extend({


    template: '#item-tray-editor-template',
    tagName:  'form',

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

      // Initialize parent.
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
    },


    /**
     * Save the order.
     */
    save: function() {
      // TODO
    },


    /**
     * When a save succeeds.
     */
    onSaveSuccess: function() {
      // TODO
    },


    /**
     * When a save fails.
     */
    onSaveError: function() {
      // TODO
    }


  });


});
