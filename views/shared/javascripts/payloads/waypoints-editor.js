
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=80; */

/**
 * @package     omeka
 * @subpackage  neatline-Waypoints
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

Neatline.module('Waypoints', function(
  Waypoints, Neatline, Backbone, Marionette, $, _) {


  Waypoints.ID = 'WAYPOINTS';


  Waypoints.addInitializer(function() {
    Waypoints.__collection = new Neatline.Shared.Record.Collection();
    Waypoints.__view = new Waypoints.View();
    Neatline.execute(Waypoints.ID+':load');
  });


});


/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=80; */

/**
 * @package     omeka
 * @subpackage  neatline-Waypoints
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

Neatline.module('Waypoints', function(
  Waypoints, Neatline, Backbone, Marionette, $, _) {


  /**
   * Load waypoint records, ordered by weight.
   */
  var load = function() {

    var params = {
      widget: 'Waypoints', order: 'weight'
    };

    Waypoints.__collection.update(params, function(records) {
      ingest(records);
    });

  };
  Neatline.commands.setHandler(Waypoints.ID+':load', load);
  Neatline.vent.on('refresh', load);


  /**
   * Render a records collection in the list.
   *
   * @param {Object} records: The collection of records.
   */
  var ingest = function(records) {
    Waypoints.__view.ingest(records);
  };
  Neatline.commands.setHandler(Waypoints.ID+':ingest', ingest);


  /**
   * Highlight a listing.
   *
   * @param {Object} args: Event arguments.
   */
  var highlight = function(args) {
    Waypoints.__view.renderHighlight(args.model);
  };
  Neatline.commands.setHandler(Waypoints.ID+':highlight', highlight);
  Neatline.vent.on('highlight', highlight);


  /**
   * Unhighlight a listing.
   *
   * @param {Object} args: Event arguments.
   */
  var unhighlight = function(args) {
    Waypoints.__view.renderUnhighlight(args.model);
  };
  Neatline.commands.setHandler(Waypoints.ID+':unhighlight', unhighlight);
  Neatline.vent.on('unhighlight', unhighlight);


  /**
   * Select tagged a listing.
   *
   * @param {Object} args: Event arguments.
   */
  var select = function(args) {
    Waypoints.__view.renderSelect(args.model);
    Waypoints.__view.scrollTo(args.model);
    unhighlight(args);
  };
  Neatline.commands.setHandler(Waypoints.ID+':select', select);
  Neatline.vent.on('select', select);


  /**
   * Unselect a listing.
   *
   * @param {Object} args: Event arguments.
   */
  var unselect = function(args) {
    Waypoints.__view.renderUnselect(args.model);
    unhighlight(args);
  };
  Neatline.commands.setHandler(Waypoints.ID+':unselect', unselect);
  Neatline.vent.on('unselect', unselect);


  /**
   * Set a record filter.
   *
   * @param {Object} args: Event arguments.
   */
  var sFilter = function(args) {
    Waypoints.__view.setFilter(args.key, args.evaluator);
  };
  Neatline.commands.setHandler(Waypoints.ID+':setFilter', sFilter);
  Neatline.vent.on('setFilter', sFilter);


  /**
   * Remove a record filter.
   *
   * @param {Object} args: Event arguments.
   */
  var rFilter = function(args) {
    Waypoints.__view.removeFilter(args.key);
  };
  Neatline.commands.setHandler(Waypoints.ID+':removeFilter', rFilter);
  Neatline.vent.on('removeFilter', rFilter);


});


/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=80; */

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

    options: {
      duration: 200
    },


    /**
     * Compile the records template, initialize state.
     */
    init: function() {

      this.template = _.template(
        $('#waypoints-public-list-template').html()
      );

      this.filters = {};
      this.model = null;

    },


    /**
     * Render a list of records.
     *
     * @param {Object} records: The records collection.
     */
    ingest: function(records) {
      this.$el.toggleClass('empty', records.length == 0);
      this.$el.html(this.template({ records: records }));
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

        // First unselect the currently-selected model. If the model for
        // the newly-clicked listing is the same as the old model - when a
        // listing is being "clicked off," break out and don't reselect.

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

      Waypoints.__collection.each(_.bind(function(record) {

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
      return Waypoints.__collection.get(
        parseInt($(e.currentTarget).attr('data-id'), 10)
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
      Neatline.vent.trigger(event, {
        source: Waypoints.ID, model: model
      });
    }


  });


});


/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=80; */

/**
 * @package     omeka
 * @subpackage  neatline-Waypoints
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

Neatline.module('Editor.Exhibit.Waypoints', function(
  Waypoints, Neatline, Backbone, Marionette, $, _) {


  Waypoints.ID = 'EDITOR:WAYPOINTS';


  Waypoints.addInitializer(function() {
    Waypoints.__collection  = new Neatline.Shared.Record.Collection();
    Waypoints.__router      = new Waypoints.Router();
    Waypoints.__view        = new Waypoints.View();
  });


});


/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=80; */

/**
 * @package     omeka
 * @subpackage  neatline-Waypoints
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

Neatline.module('Editor.Exhibit.Waypoints', function(
  Waypoints, Neatline, Backbone, Marionette, $, _) {


  /**
   * Display the form and update the sorting list.
   *
   * @param {Object} container: The container element.
   */
  var display = function(container) {

    Waypoints.__view.showIn(container);

    var params = {
      widget: 'waypoints', order: 'weight'
    };

    Waypoints.__collection.update(params, function(records) {
      Waypoints.__view.ingest(records);
    });

  };
  Neatline.commands.setHandler(Waypoints.ID+':display', display);


});


/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=80; */

/**
 * @package     omeka
 * @subpackage  neatline-Waypoints
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

Neatline.module('Editor.Exhibit.Waypoints', function(
  Waypoints, Neatline, Backbone, Marionette, $, _) {


  Waypoints.Router = Neatline.Editor.Router.extend({


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


/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=80; */

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
     * Instantiate Sortable, compile the records template.
     */
    init: function() {
      this.__ui.list.sortable();
      this.template = _.template(
        $('#waypoints-editor-list-template').html()
      );
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
        source: Waypoints.ID
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
