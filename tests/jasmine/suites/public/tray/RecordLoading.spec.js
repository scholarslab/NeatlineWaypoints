
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */

/**
 * Tests for item tray record loading.
 *
 * @package     omeka
 * @subpackage  neatline
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

describe('Record Loading', function() {


  beforeEach(function() {
    _tray.loadNeatline();
  });


  it('should load records when the exhibit starts', function() {

    // --------------------------------------------------------------------
    // When the exhibit starts, the item tray should render listings for
    // records that arrive in the initial query.
    // --------------------------------------------------------------------

    _tray.respondItemTray200(_tray.json.RecordLoading.records.regular);
    var rows = _tray.getItemTrayRows();

    // Show list titles.
    expect($(rows[0])).toHaveText('title1');
    expect($(rows[1])).toHaveText('title2');
    expect($(rows[2])).toHaveText('title3');

  });


  it('should reload records when the exhibit is refreshed');


});
