
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */

/**
 * @package     omeka
 * @subpackage  neatline-Waypoints
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

describe('Neatline | Publications', function() {


  var vent, model1, model2, row1, row2, fx = {
    records: readFixtures('NeatlinePubSub.json')
  };


  beforeEach(function() {

    WP.loadNeatline();
    WP.respondWaypoints200(fx.records);

    vent    = spyOn(Neatline.vent, 'trigger').andCallThrough();

    model1  = WP.getWidgetModelByTitle('title1');
    model2  = WP.getWidgetModelByTitle('title2');

    row1    = WP.getWidgetRowByTitle('title1');
    row2    = WP.getWidgetRowByTitle('title2');

  });


  describe('highlight', function() {

    it('should publish `highlight` on record hover', function() {

      // ------------------------------------------------------------------
      // When the cursor enters a record listing, the `highlight` event
      // should be published with the corresponding model.
      // ------------------------------------------------------------------

      row1.trigger('mouseenter')

      expect(vent).toHaveBeenCalledWith('highlight', {
        model:  model1,
        source: Neatline.Waypoints.ID
      });

    });

  });


  describe('unhighlight', function() {

    it('should publish `unhighlight` on record hover', function() {

      // --------------------------------------------------------------------
      // When the cursor leaves a record listing, the `unhighlight` event
      // should be published with the corresponding model.
      // --------------------------------------------------------------------

      row1.trigger('mouseleave')

      expect(vent).toHaveBeenCalledWith('unhighlight', {
        model:  model1,
        source: Neatline.Waypoints.ID
      });

    });

  });


  describe('select/unselect', function() {

    it('should publish `select` on record click', function() {

      // --------------------------------------------------------------------
      // When a record listing is clicked, the `select` event should be
      // published with the corresponding model.
      // --------------------------------------------------------------------

      row1.trigger('click')

      expect(vent).toHaveBeenCalledWith('select', {
        model:  model1,
        source: Neatline.Waypoints.ID
      });

    });

    it('should unselect currently-selected model', function() {

      // ------------------------------------------------------------------
      // If another model is currently selected, it should be unselected.
      // ------------------------------------------------------------------

      row1.trigger('click');
      row2.trigger('click');

      expect(vent).toHaveBeenCalledWith('unselect', {
        model:  model1,
        source: Neatline.Waypoints.ID
      });

    });

    it('should unselect (not re-select) on click-off', function() {

      // ------------------------------------------------------------------
      // When a listing is clicked off - clicked again when it is already
      // selected - the listing should _just_ be unselected, as opposed to
      // being immediately re-selected as the new selection.
      // ------------------------------------------------------------------

      row1.trigger('click');
      vent.reset();
      row1.trigger('click');

      // Should unselect.
      expect(vent).toHaveBeenCalledWith('unselect', {
        model:  model1,
        source: Neatline.Waypoints.ID
      });

      // Should not re-select.
      expect(vent).not.toHaveBeenCalledWith('select', {
        model:  model1,
        source: Neatline.Waypoints.ID
      });

    });

  });


});
