
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */

/**
 * Item tray view.
 *
 * @package     omeka
 * @subpackage  neatline
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

Neatline.module('ItemTray', function(
  ItemTray, Neatline, Backbone, Marionette, $, _) {


  ItemTray.View = Neatline.Shared.Widget.View.extend({


    id: 'item-tray',


    /**
     * Compile the records template.
     */
    init: function() {

      // Initialize parent.
      ItemTray.View.__super__.init.apply(this);

      // Compile template.
      this.template = _.template(
        $('#item-tray-records-template').html()
      );

    },


    /**
     * Render a list of records.
     *
     * @param {Object} records: The records collection.
     */
    ingest: function(records) {
      this.$el.html(this.template({ records: records }));
    },


  });


});
