
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=80; */

/**
 * @package     omeka
 * @subpackage  neatline-Waypoints
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

Neatline.module('Waypoints', function(Waypoints) {


  Waypoints.View = Neatline.Shared.Widget.View.extend({


    id: 'waypoints',

    events: {
      'mouseenter a': 'publishHighlight',
      'mouseleave a': 'publishUnhighlight',
      'click a':      'publishSelect'
    },

    options: {
      duration: 200
    },


    /**
     * Compile the list template and initialize state.
     *
     * @param {Object} options
     */
    init: function(options) {

      this.slug = options.slug;

      this.model = null; // The currently-selected model.
      this.filters = {}; // The active filters.

      // Compile the list template.
      this.template = _.template($('#waypoints-public-list-template').html());

      // Create the list collection.
      this.records = new Neatline.Shared.Record.Collection();

    },


    /**
     * Load waypoint records, ordered by weight.
     */
    load: function() {
      var params = { widget: 'Waypoints', order: 'weight' };
      this.records.update(params, _.bind(this.ingest, this));
    },


    /**
     * Render the list of records and apply filters.
     */
    ingest: function() {
      this.$el.toggleClass('empty', this.records.length == 0);
      this.$el.html(this.template({ records: this.records }));
      this.filter();
    },


    // PUBLISHERS
    // --------------------------------------------------------------------


    /**
     * Publish `highlight` when the cursor enters a listing.
     *
     * @param {Object} e: The DOM event.
     */
    publishHighlight: function(e) {
      this.publish('highlight', this.getModelByEvent(e));
    },


    /**
     * Publish `unhighlight` when the cursor leaves a listing.
     *
     * @param {Object} e: The DOM event.
     */
    publishUnhighlight: function(e) {
      this.publish('unhighlight', this.getModelByEvent(e));
    },


    /**
     * Publish `select` when a listing is clicked.
     *
     * @param {Object} e: The DOM event.
     */
    publishSelect: function(e) {

      // Get the new model, cache old model.
      var newModel = this.getModelByEvent(e);
      var oldModel = this.model;

      if (oldModel) {

        // First unselect the currently-selected model. If the model for the
        // newly-clicked listing is the same as the old model - when a listing
        // is being "clicked off," break out and don't reselect.

        this.publish('unselect', oldModel);
        if (oldModel.id == newModel.id) return;

      }

      this.publish('select', newModel);

    },


    // RENDERERS
    // --------------------------------------------------------------------


    /**
     * Add `highlighted` class to a listing.
     *
     * @param {Object} model: The record model.
     */
    renderHighlight: function(model) {
      this.getElementById(model.id).addClass('highlighted');
    },


    /**
     * Remove `highlighted` class from a listing.
     *
     * @param {Object} model: The record model.
     */
    renderUnhighlight: function(model) {
      this.getElementById(model.id).removeClass('highlighted');
    },


    /**
     * Add `selected` class to a listing.
     *
     * @param {Object} model: The record model.
     */
    renderSelect: function(model) {
      this.getElementById(model.id).addClass('selected');
      this.model = model;
    },


    /**
     * Remove `selected` class from a listing.
     *
     * @param {Object} model: The record model.
     */
    renderUnselect: function(model) {
      this.getElementById(model.id).removeClass('selected');
      this.model = null;
    },


    /**
     * Scroll to the listing for a model.
     *
     * @param {Object} model: The record model.
     */
    scrollTo: function(model) {

      // Get the record listing.
      var el = this.getElementById(model.id)[0];
      if (!el) return;

      // Scroll the listing to the top.
      this.$el.animate({ scrollTop: el.offsetTop },
        { duration: this.options.duration }
      );

    },


    // FILTERS
    // --------------------------------------------------------------------


    /**
     * Register a record filter.
     *
     * @param {String} key: A key to identify the filter.
     * @param {Function} evaluator: The boolean filtering function.
     */
    setFilter: function(key, evaluator) {
      this.filters[key] = evaluator;
      this.filter();
    },


    /**
     * Remove a record filter.
     *
     * @param {String} key: The key of the filter to remove.
     */
    removeFilter: function(key) {
      delete this.filters[key];
      this.filter();
    },


    /**
     * Pass listings through the collection of registered filters.
     */
    filter: function() {

      this.records.each(_.bind(function(record) {

        var visible = true;

        // Pass the model through the evaluator.
        _.each(this.filters, function(evaluator, key) {
          visible = visible && evaluator(record);
        });

        // Show/hide the record listing.
        this.getElementById(record.id).toggle(visible);

      }, this));
    },


    // HELPERS
    // --------------------------------------------------------------------


    /**
     * Get the model for a DOM event.
     *
     * @param {Object} e: The DOM event.
     */
    getModelByEvent: function(e) {
      return this.records.get(Number($(e.currentTarget).attr('data-id'))
      );
    },


    /**
     * Get the DOM element for a record.
     *
     * @param {Number} id: The record id.
     */
    getElementById: function(id) {
      return this.$('a[data-id='+id+']');
    },


    /**
     * Publish an event with a model.
     *
     * @param {String} event: An event name.
     * @param {Object} model: A record model.
     */
    publish: function(event, model) {
      Neatline.vent.trigger(event, { model: model, source: this.slug });
    }


  });


});
