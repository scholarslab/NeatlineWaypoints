
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */

/**
 * @package     omeka
 * @subpackage  neatline-Waypoints
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

describe('Neatline | Subscriptions', function() {


  var model1, model2, row1, row2, fx = {
    records: readFixtures('NeatlinePubSub.json')
  };


  beforeEach(function() {

    WP.loadNeatline();
    WP.respondWaypoints200(fx.records);

    model1  = WP.getWidgetModelByTitle('title1');
    model2  = WP.getWidgetModelByTitle('title2');

    row1    = WP.getWidgetRowByTitle('title1');
    row2    = WP.getWidgetRowByTitle('title2');

  });


  describe('highlight', function() {

    it('should add `highlighted` class', function() {

      // ------------------------------------------------------------------
      // When `highlight` is triggered, the `highlighted` class should be
      // added to the corresponding listing.
      // ------------------------------------------------------------------

      Neatline.vent.trigger('highlight', { model: model1 });

      expect(row1).toHaveClass('highlighted');
      expect(row2).not.toHaveClass('highlighted');

    });

  });


  describe('unhighlight', function() {

    it('should remove `highlighted` class', function() {

      // ------------------------------------------------------------------
      // When `unhighlight` is triggered, the `highlighted` class should
      // be removed to the corresponding listing.
      // ------------------------------------------------------------------

      Neatline.vent.trigger('highlight', { model: model1 });
      Neatline.vent.trigger('unhighlight', { model: model1 });

      expect(row1).not.toHaveClass('highlighted');

    });

  });


  describe('select', function() {

    it('should add `selected` class', function() {

      // ------------------------------------------------------------------
      // When `select` is triggered, the `selected` class should be added
      // to the corresponding listing.
      // ------------------------------------------------------------------

      Neatline.vent.trigger('select', { model: model1 });

      expect(row1).toHaveClass('selected');
      expect(row2).not.toHaveClass('selected');

    });

    it('should remove `highlighted` class', function() {

      // ------------------------------------------------------------------
      // The `highlighted` class should be removed, in case it was added
      // before the record was selected.
      // ------------------------------------------------------------------

      Neatline.vent.trigger('highlight', { model: model1 });
      Neatline.vent.trigger('select', { model: model1 });

      expect(row1).not.toHaveClass('highlighted');

    });

  });


  describe('unselect', function() {

    it('should remove `selected` class', function() {

      // ------------------------------------------------------------------
      // When `unselect` is triggered, the `selected` class should be
      // removed from the corresponding listing.
      // ------------------------------------------------------------------

      Neatline.vent.trigger('select', { model: model1 });
      Neatline.vent.trigger('unselect', { model: model1 });

      expect(row1).not.toHaveClass('selected');

    });

    it('should remove `highlighted` class', function() {

      // ------------------------------------------------------------------
      // The `highlighted` class should also be removed, in case it was
      // added before the record was selected.
      // ------------------------------------------------------------------

      Neatline.vent.trigger('highlight', { model: model1 });
      Neatline.vent.trigger('unselect', { model: model1 });

      expect(row1).not.toHaveClass('highlighted');

    });

  });


  describe('setFilter', function() {

    it('should apply filter');

  });


  describe('removeFilter', function() {

    it('should remove filter');

  });


});
