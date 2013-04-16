
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

    events: {
      'mouseenter a': 'onShow',
      'mouseleave a': 'onHide',
      'click a': 'onSelect'
    },


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


    /**
     * Show presenter on hover.
     *
     * @param {Object} e: The DOM event.
     */
    onShow: function(e) {
      Neatline.vent.trigger('show', this.getModel(e));
    },


    /**
     * Hide presenter on unhover.
     *
     * @param {Object} e: The DOM event.
     */
    onHide: function(e) {
      Neatline.vent.trigger('hide', this.getModel(e));
    },


    /**
     * Select when a record is clicked.
     *
     * @param {Object} e: The DOM event.
     */
    onSelect: function(e) {
      var model = this.getModel(e);
      Neatline.execute('MAP:focusById', model.id);
      Neatline.vent.trigger('select', model);
    },


    /**
     * Get the model for a DOM event.
     *
     * @param {Object} e: The DOM event.
     */
    getModel: function(e) {
      return ItemTray.__collection.get(
        parseInt($(e.currentTarget).attr('data-id'), 10)
      );
    }


  });


});
