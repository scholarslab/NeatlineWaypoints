
/**
 * @package     omeka
 * @subpackage  neatline-Waypoints
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

Neatline.module('Waypoints', function(Waypoints) {


  Waypoints.Controller = Neatline.Shared.Controller.extend({


    slug: 'WAYPOINTS',

    events: [
      { 'refresh': 'load' },
      'highlight',
      'unhighlight',
      'select',
      'unselect',
      'setFilter',
      'removeFilter'
    ],


    /**
     * Create the view, load starting records.
     */
    init: function() {
      this.view = new Waypoints.View({ slug: this.slug });
      this.load();
    },


    /**
     * Load waypoint records, ordered by weight.
     */
    load: function() {
      this.view.load();
    },


    /**
     * Highlight a listing.
     *
     * @param {Object} args: Event arguments.
     */
    highlight: function(args) {
      this.view.renderHighlight(args.model);
    },


    /**
     * Unhighlight a listing.
     *
     * @param {Object} args: Event arguments.
     */
    unhighlight: function(args) {
      this.view.renderUnhighlight(args.model);
    },


    /**
     * Select tagged a listing.
     *
     * @param {Object} args: Event arguments.
     */
    select: function(args) {
      this.view.renderSelect(args.model);
      this.view.scrollTo(args.model);
      this.unhighlight(args);
    },


    /**
     * Unselect a listing.
     *
     * @param {Object} args: Event arguments.
     */
    unselect: function(args) {
      this.view.renderUnselect(args.model);
      this.unhighlight(args);
    },


    /**
     * Set a record filter.
     *
     * @param {Object} args: Event arguments.
     */
    setFilter: function(args) {
      this.view.setFilter(args.key, args.evaluator);
    },


    /**
     * Remove a record filter.
     *
     * @param {Object} args: Event arguments.
     */
    removeFilter: function(args) {
      this.view.removeFilter(args.key);
    }


  });


});


/**
 * @package     omeka
 * @subpackage  neatline-Waypoints
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

Neatline.module('Waypoints', function(Waypoints) {


  Waypoints.addInitializer(function() {
    Waypoints.__controller = new Waypoints.Controller();
  });


});


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
      this.template = _.template(
        $('#waypoints-public-list-template').html()
      );

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
      return this.$('a[data-id="'+id+'"]');
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


/**
 * @package     omeka
 * @subpackage  neatline-Waypoints
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

Neatline.module('Editor.Exhibit.Waypoints', function(Waypoints) {


  Waypoints.Controller = Neatline.Shared.Controller.extend({


    slug: 'EDITOR:WAYPOINTS',

    commands: ['display'],


    /**
     * Create the router and view.
     */
    init: function() {
      this.router = new Waypoints.Router();
      this.view = new Waypoints.View({ slug: this.slug });
    },


    /**
     * Display the form and update the sorting list.
     *
     * @param {Object} container: The container element.
     */
    display: function(container) {
      this.view.showIn(container);
      this.view.load()
    }


  });


});


/**
 * @package     omeka
 * @subpackage  neatline-Waypoints
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

Neatline.module('Editor.Exhibit.Waypoints', function(Waypoints) {


  Waypoints.addInitializer(function() {
    Waypoints.__controller = new Waypoints.Controller();
  });


});


/**
 * @package     omeka
 * @subpackage  neatline-Waypoints
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

Neatline.module('Editor.Exhibit.Waypoints', function(Waypoints) {


  Waypoints.Router = Neatline.Shared.Router.extend({


    routes: {
      waypoints: 'waypoints'
    },


    /**
     * Show the waypoints sorting form.
     */
    waypoints: function() {

      Neatline.execute('EDITOR:display', [
        'EDITOR:EXHIBIT',
        'EDITOR:WAYPOINTS'
      ]);

      Neatline.execute(
        'EDITOR:EXHIBIT:activateTab', 'waypoints'
      );

    }


  });


});


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

      // Create the list collection.
      this.records = new Neatline.Shared.Record.Collection();

      // Make list sortable.
      this.__ui.list.sortable();

    },


    /**
     * Load waypoint records, ordered by weight.
     */
    load: function() {

      var params = {
        widget: 'Waypoints', order: 'weight'
      };

      // Query for records.
      this.records.update(params, _.bind(function(records) {
        this.ingest(records);
      }, this));

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
        Neatline.g.waypoints.strings.order.save.success
      );

    },


    /**
     * When a save fails.
     */
    onSaveError: function() {

      // Flash error message.
      Neatline.execute('EDITOR:notifyError',
        Neatline.g.waypoints.strings.order.save.error
      );

    }


  });


});
