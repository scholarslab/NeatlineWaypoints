
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */

/**
 * @package     omeka
 * @subpackage  neatline-Waypoints
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

describe('Waypoints Open', function() {


  beforeEach(function() {
    WP.loadEditor();
    WP.showWaypoints(WP.json.SortingForm.records);
  });


  it('should load records when tab is selected', function() {

    // --------------------------------------------------------------------
    // When the "Waypoints" tab is selected, the  list of records under
    // "Waypoint Order" should be loaded from the server. 
    // --------------------------------------------------------------------

    var rows = WP.getEditorRows();
    expect($(rows[0])).toHaveText('title1');
    expect($(rows[1])).toHaveText('title2');
    expect($(rows[2])).toHaveText('title3');

  });


  it('should make the list sortable', function() {

    // --------------------------------------------------------------------
    // The list of records under "Waypoint Order" should be sortable.
    // --------------------------------------------------------------------

    expect(WP.vw.WPEDIT.__ui.sort).toHaveClass('ui-sortable');

  });


});
