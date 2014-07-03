
/**
 * @package     omeka
 * @subpackage  neatline-Waypoints
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

describe('Editor | Open Form', function() {


  var rows, fixtures = {
    regular:  readFixtures('EditorForm.regular.json'),
    empty:    readFixtures('EditorForm.empty.json')
  };


  beforeEach(function() {
    WP.loadEditor();
  });


  describe('when waypoints exist', function() {

    beforeEach(function() {
      WP.showForm(fixtures.regular);
      rows = WP.getEditorRows();
    });

    it('should display waypoints', function() {

      // ----------------------------------------------------------------------
      // When the "Waypoints" tab is activated, the "Edit Waypoint Order" list
      // should be populated with records.
      // ----------------------------------------------------------------------

      expect($(rows[0])).toHaveText('title1');
      expect($(rows[1])).toHaveText('title2');
      expect($(rows[2])).toHaveText('title3');
      expect(rows.length).toEqual(3);

    });

    it('should enable the "Save" button', function() {

      // ----------------------------------------------------------------------
      // If the "Save" button was previously disabled in response to an empty
      // collection of waypoints, it should be re-enabled if records have been
      // added to the widget since the last form open.
      // ----------------------------------------------------------------------

      WP.showForm(fixtures.empty);
      WP.showForm(fixtures.regular);
      expect(WP.v.editor.__ui.save).not.toHaveClass('disabled');

    });

    it('should enable sorting', function() {

      // ----------------------------------------------------------------------
      // The records under "Edit Waypoint Order" should be sortable.
      // ----------------------------------------------------------------------

      expect(
        WP.v.editor.__ui.list.sortable('option', 'disabled')
      ).toBeFalsy();

    });

  });

  describe('when waypoints do not exist', function() {

    beforeEach(function() {
      WP.showForm(fixtures.empty);
      rows = WP.getEditorRows();
    });

    it('should display a placeholder row', function() {

      // ----------------------------------------------------------------------
      // A placeholder message saying that no waypoints have been added should
      // be displayed under "Edit Waypoint Order."
      // ----------------------------------------------------------------------

      // Placeholder text.
      var empty = Neatline.g.waypoints.strings.order.placeholders.empty;
      expect($(rows[0])).toHaveText(empty);

      // No waypoints listed.
      expect(rows.length).toEqual(1);

    });

    it('should disable the "Save" button', function() {

      // ----------------------------------------------------------------------
      // The "Save" button should be disabled.
      // ----------------------------------------------------------------------

      expect(WP.v.editor.__ui.save).toHaveClass('disabled');

    });

    it('should not make waypoints sortable', function() {

      // ----------------------------------------------------------------------
      // The row with the placeholder message should not be sortable.
      // ----------------------------------------------------------------------

      var cantSort = WP.v.editor.__ui.list.sortable('option', 'disabled');
      expect(cantSort).toBeTruthy();

    });

  });


});
