
/**
 * @package     omeka
 * @subpackage  neatline-Waypoints
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

describe('Neatline | Subscriptions', function() {


  var model1, model2, row1, row2, fixtures = {
    records: readFixtures('NeatlineEvents.json')
  };


  beforeEach(function() {

    WP.loadNeatline();
    WP.respondWaypoints200(fixtures.records);

    model1 = WP.getWidgetModelByTitle('title1');
    model2 = WP.getWidgetModelByTitle('title2');

    row1 = WP.getWidgetRowByTitle('title1');
    row2 = WP.getWidgetRowByTitle('title2');

  });


  describe('highlight', function() {

    it('should add `highlighted` class', function() {

      // ----------------------------------------------------------------------
      // When `highlight` is triggered, the `highlighted` class should be
      // added to the corresponding listing.
      // ----------------------------------------------------------------------

      Neatline.vent.trigger('highlight', { model: model1 });

      expect(row1).toHaveClass('highlighted');
      expect(row2).not.toHaveClass('highlighted');

    });

  });


  describe('unhighlight', function() {

    it('should remove `highlighted` class', function() {

      // ----------------------------------------------------------------------
      // When `unhighlight` is triggered, the `highlighted` class should be
      // removed to the corresponding listing.
      // ----------------------------------------------------------------------

      Neatline.vent.trigger('highlight', { model: model1 });
      Neatline.vent.trigger('unhighlight', { model: model1 });

      expect(row1).not.toHaveClass('highlighted');

    });

  });


  describe('select', function() {

    it('should add `selected` class', function() {

      // ----------------------------------------------------------------------
      // When `select` is triggered, the `selected` class should be added to
      // the corresponding listing.
      // ----------------------------------------------------------------------

      Neatline.vent.trigger('select', { model: model1 });

      expect(row1).toHaveClass('selected');
      expect(row2).not.toHaveClass('selected');

    });

    it('should remove `highlighted` class', function() {

      // ----------------------------------------------------------------------
      // The `highlighted` class should be removed, in case it was added
      // before the record was selected.
      // ----------------------------------------------------------------------

      Neatline.vent.trigger('highlight', { model: model1 });
      Neatline.vent.trigger('select', { model: model1 });

      expect(row1).not.toHaveClass('highlighted');

    });

    it('should handle missing listing', function() {

      // ----------------------------------------------------------------------
      // An error should not be thrown if a model is passed that does not have
      // a corresponding listing.
      // ----------------------------------------------------------------------

      // Create a model that does not have a listing.
      var absent = new Neatline.Shared.Record.Model({ id: 999 });

      expect(function() {
        Neatline.vent.trigger('select', { model: absent });
      }).not.toThrow();

    });

  });


  describe('unselect', function() {

    it('should remove `selected` class', function() {

      // ----------------------------------------------------------------------
      // When `unselect` is triggered, the `selected` class should be removed
      // from the corresponding listing.
      // ----------------------------------------------------------------------

      Neatline.vent.trigger('select', { model: model1 });
      Neatline.vent.trigger('unselect', { model: model1 });

      expect(row1).not.toHaveClass('selected');

    });

    it('should remove `highlighted` class', function() {

      // ----------------------------------------------------------------------
      // The `highlighted` class should also be removed, in case it was added
      // before the record was selected.
      // ----------------------------------------------------------------------

      Neatline.vent.trigger('highlight', { model: model1 });
      Neatline.vent.trigger('unselect', { model: model1 });

      expect(row1).not.toHaveClass('highlighted');

    });

    it('should handle missing model');

  });


  describe('setFilter', function() {

    it('should set filters', function() {

      // ----------------------------------------------------------------------
      // `setFilter` should register the passed evaluator function and re-
      // filter all record listings.
      // ----------------------------------------------------------------------

      // By default, all listings visible.
      expect(WP.getWidgetRowByTitle('title1')).toBeVisible();
      expect(WP.getWidgetRowByTitle('title2')).toBeVisible();
      expect(WP.getWidgetRowByTitle('title3')).toBeVisible();

      // Filter out records with `title1`
      Neatline.vent.trigger('setFilter', {
        key: 'title1',
        evaluator: function(record) {
          return record.get('title') != 'title1';
        }
      });

      // Record 1 should be hidden.
      expect(WP.getWidgetRowByTitle('title1')).not.toBeVisible();
      expect(WP.getWidgetRowByTitle('title2')).toBeVisible();
      expect(WP.getWidgetRowByTitle('title3')).toBeVisible();

      // Filter out records with `title2`
      Neatline.vent.trigger('setFilter', {
        key: 'title2',
        evaluator: function(record) {
          return record.get('title') != 'title2';
        }
      });

      // Records 1 and 2 should be hidden.
      expect(WP.getWidgetRowByTitle('title1')).not.toBeVisible();
      expect(WP.getWidgetRowByTitle('title2')).not.toBeVisible();
      expect(WP.getWidgetRowByTitle('title3')).toBeVisible();

      // Filter out records with `title3`
      Neatline.vent.trigger('setFilter', {
        key: 'title3',
        evaluator: function(record) {
          return record.get('title') != 'title3';
        }
      });

      // Records 1, 2, and 3 should be hidden.
      expect(WP.getWidgetRowByTitle('title1')).not.toBeVisible();
      expect(WP.getWidgetRowByTitle('title2')).not.toBeVisible();
      expect(WP.getWidgetRowByTitle('title3')).not.toBeVisible();

    });

    it('should filter new listings', function() {

      // ----------------------------------------------------------------------
      // When new listings are ingested, they should be passed through the
      // collection of registered filters.
      // ----------------------------------------------------------------------

      // Filter out records with `title1`
      Neatline.vent.trigger('setFilter', {
        key: 'title1',
        evaluator: function(record) {
          return record.get('title') != 'title1';
        }
      });

      // Trigger a record refresh.
      Neatline.vent.trigger('refresh');
      WP.respondWaypoints200(fixtures.records);

      // Record 1 should be hidden.
      expect(WP.getWidgetRowByTitle('title1')).not.toBeVisible();
      expect(WP.getWidgetRowByTitle('title2')).toBeVisible();
      expect(WP.getWidgetRowByTitle('title3')).toBeVisible();

    });

  });


  describe('removeFilter', function() {

    it('should remove filter', function() {

      // ----------------------------------------------------------------------
      // `removeFilter` should remove evaluator function identified by the
      // passed key and re-filter all record listings.
      // ----------------------------------------------------------------------

      // Filter out records with `title1`, `title2`, and `title3`.

      Neatline.vent.trigger('setFilter', {
        key: 'title1',
        evaluator: function(record) {
          return record.get('title') != 'title1';
        }
      });

      Neatline.vent.trigger('setFilter', {
        key: 'title2',
        evaluator: function(record) {
          return record.get('title') != 'title2';
        }
      });

      Neatline.vent.trigger('setFilter', {
        key: 'title3',
        evaluator: function(record) {
          return record.get('title') != 'title3';
        }
      });

      // Records 1, 2, and 3 should be hidden.
      expect(WP.getWidgetRowByTitle('title1')).not.toBeVisible();
      expect(WP.getWidgetRowByTitle('title2')).not.toBeVisible();
      expect(WP.getWidgetRowByTitle('title3')).not.toBeVisible();

      // Remove `title1` filter.
      Neatline.vent.trigger('removeFilter', { key: 'title1' });

      // Record 1 should be visible.
      expect(WP.getWidgetRowByTitle('title1')).toBeVisible();
      expect(WP.getWidgetRowByTitle('title2')).not.toBeVisible();
      expect(WP.getWidgetRowByTitle('title3')).not.toBeVisible();

      // Remove `title2` filter.
      Neatline.vent.trigger('removeFilter', { key: 'title2' });

      // Records 1 and 2 should be visible.
      expect(WP.getWidgetRowByTitle('title1')).toBeVisible();
      expect(WP.getWidgetRowByTitle('title2')).toBeVisible();
      expect(WP.getWidgetRowByTitle('title3')).not.toBeVisible();

      // Remove `title3` filter.
      Neatline.vent.trigger('removeFilter', { key: 'title3' });

      // Records 1, 2, and 3 should be visible.
      expect(WP.getWidgetRowByTitle('title1')).toBeVisible();
      expect(WP.getWidgetRowByTitle('title2')).toBeVisible();
      expect(WP.getWidgetRowByTitle('title3')).toBeVisible();

    });

  });


});
