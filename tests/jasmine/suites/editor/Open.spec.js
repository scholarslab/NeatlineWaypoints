
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */

/**
 * @package     omeka
 * @subpackage  neatline-Waypoints
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

describe('Open', function() {


  beforeEach(function() {

    _w.loadEditor();

    _t.navigate('waypoints');
    _t.respondLast200(_w.json.Sorting.records);

  });


  it('should load records when tab is selected', function() {

    // --------------------------------------------------------------------
    // When the "Waypoints" tab is selected, the sortable list of records
    // under "Waypoint Order" should be loaded from the server. 
    // --------------------------------------------------------------------

    var rows = _w.getEditorRows();
    expect($(rows[0])).toHaveText('title1');
    expect($(rows[1])).toHaveText('title2');
    expect($(rows[2])).toHaveText('title3');

  });


  it('should make the list sortable', function() {

    // --------------------------------------------------------------------
    // The list of records under "Record Order" should be sortable.
    // --------------------------------------------------------------------

    expect(_w.vw.WPEDIT.__ui.sort).toHaveClass('ui-sortable');

  });


});
