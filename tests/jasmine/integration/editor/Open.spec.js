
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */

/**
 * @package     omeka
 * @subpackage  neatline-Waypoints
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

describe('Form Open', function() {


  var rows, fx = {
    regular:  readFixtures('Form.records.regular.json'),
    empty:    readFixtures('Form.records.empty.json')
  };


  beforeEach(function() {
    WP.loadEditor();
  });


  describe('when waypoints exist', function() {

    beforeEach(function() {
      WP.showForm(fx.regular);
      rows = WP.getEditorRows();
    });

    it('should display waypoints', function() {

      // ------------------------------------------------------------------
      // When the "Waypoints" tab is activated, the "Edit Waypoint Order"
      // list should be populated with records.
      // ------------------------------------------------------------------

      expect($(rows[0])).toHaveText('title1');
      expect($(rows[1])).toHaveText('title2');
      expect($(rows[2])).toHaveText('title3');
      expect(rows.length).toEqual(3);

    });

    it('should enable the "Save" button', function() {

      // ------------------------------------------------------------------
      // If the "Save" button was previously disabled in response to an
      // empty collection of waypoints, it should be re-enabled if records
      // have been added to the widget since the last form open.
      // ------------------------------------------------------------------

      WP.showForm(fx.empty);
      WP.showForm(fx.regular);
      expect(WP.vw.EDITOR.__ui.save).not.toHaveClass('disabled');

    });

    it('should enable sorting', function() {

      // ------------------------------------------------------------------
      // The records under "Edit Waypoint Order" should be sortable.
      // ------------------------------------------------------------------

      expect(
        WP.vw.EDITOR.__ui.list.sortable('option', 'disabled')
      ).toBeFalsy();

    });

  });

  describe('when waypoints do not exist', function() {

    beforeEach(function() {
      WP.showForm(fx.empty);
      rows = WP.getEditorRows();
    });

    it('should display a placeholder row', function() {

      // ------------------------------------------------------------------
      // A placeholder message saying that no waypoints have been added
      // should be displayed under "Edit Waypoint Order."
      // ------------------------------------------------------------------

      expect($(rows[0])).toHaveText(WP_STRINGS.order.placeholders.empty);
      expect(rows.length).toEqual(1);

    });

    it('should disable the "Save" button', function() {

      // ------------------------------------------------------------------
      // The "Save" button should be disabled.
      // ------------------------------------------------------------------

      expect(WP.vw.EDITOR.__ui.save).toHaveClass('disabled');

    });

    it('should not make waypoints sortable', function() {

      // ------------------------------------------------------------------
      // The row with the placeholder message should not be sortable.
      // ------------------------------------------------------------------

      expect(
        WP.vw.EDITOR.__ui.list.sortable('option', 'disabled')
      ).toBeTruthy();

    });

  });


});
