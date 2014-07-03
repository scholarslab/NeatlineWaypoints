
/**
 * @package     omeka
 * @subpackage  neatline-Waypoints
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

describe('Neatline | Publications', function() {


  var vent, model1, model2, row1, row2, fixtures = {
    records: readFixtures('NeatlineEvents.json')
  };


  beforeEach(function() {

    WP.loadNeatline();
    WP.respondWaypoints200(fixtures.records);

    model1 = WP.getWidgetModelByTitle('title1');
    model2 = WP.getWidgetModelByTitle('title2');

    row1 = WP.getWidgetRowByTitle('title1');
    row2 = WP.getWidgetRowByTitle('title2');

    vent = spyOn(Neatline.vent, 'trigger').and.callThrough();

  });


  describe('highlight', function() {

    it('should publish `highlight` on record hover', function() {

      // ----------------------------------------------------------------------
      // When the cursor enters a waypoint, the `highlight` event should be
      // published with the corresponding model.
      // ----------------------------------------------------------------------

      row1.trigger('mouseenter')

      expect(vent).toHaveBeenCalledWith('highlight', {
        model: model1, source: Neatline.Waypoints.__controller.slug
      });

    });

  });


  describe('unhighlight', function() {

    it('should publish `unhighlight` on record hover', function() {

      // ----------------------------------------------------------------------
      // When the cursor leaves a waypoint, the `unhighlight` event should be
      // published with the corresponding model.
      // ----------------------------------------------------------------------

      row1.trigger('mouseleave')

      expect(vent).toHaveBeenCalledWith('unhighlight', {
        model: model1, source: Neatline.Waypoints.__controller.slug
      });

    });

  });


  describe('select/unselect', function() {

    it('should publish `select` on record click', function() {

      // ----------------------------------------------------------------------
      // When a waypoint is clicked, the `select` event should be published
      // with the corresponding model.
      // ----------------------------------------------------------------------

      row1.trigger('click')

      expect(vent).toHaveBeenCalledWith('select', {
        model: model1, source: Neatline.Waypoints.__controller.slug
      });

    });

    it('should unselect currently-selected model', function() {

      // ----------------------------------------------------------------------
      // If another model is currently selected, it should be unselected.
      // ----------------------------------------------------------------------

      row1.trigger('click');
      row2.trigger('click');

      expect(vent).toHaveBeenCalledWith('unselect', {
        model: model1, source: Neatline.Waypoints.__controller.slug
      });

    });

    it('should unselect (not re-select) on click-off', function() {

      // ----------------------------------------------------------------------
      // When a waypoint is clicked off (clicked again when it is already
      // selected) the listing should just be unselected, as opposed to being
      // immediately re-selected as the new selection.
      // ----------------------------------------------------------------------

      row1.trigger('click');
      vent.calls.reset();
      row1.trigger('click');

      // Should unselect.
      expect(vent).toHaveBeenCalledWith('unselect', {
        model: model1, source: Neatline.Waypoints.__controller.slug
      });

      // Should not re-select.
      expect(vent).not.toHaveBeenCalledWith('select', {
        model: model1, source: Neatline.Waypoints.__controller.slug
      });

    });

  });


});
