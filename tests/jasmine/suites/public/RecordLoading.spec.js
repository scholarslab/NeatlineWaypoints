
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */

/**
 * @package     omeka
 * @subpackage  neatline-Waypoints
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

describe('Record Loading', function() {


  beforeEach(function() {
    WP.loadNeatline();
    WP.respondWaypoints200(WP.json.RecordLoading.records.regular);
  });


  it('should load records when the exhibit starts', function() {

    // --------------------------------------------------------------------
    // When the exhibit starts, the waypoints should template listings for
    // records that arrive in the initial query.
    // --------------------------------------------------------------------

    var rows = WP.getRows();

    // Show list titles.
    expect($(rows[0])).toHaveText('title1');
    expect($(rows[1])).toHaveText('title2');
    expect($(rows[2])).toHaveText('title3');

  });


  it('should reload records when the exhibit is refreshed', function() {

    // --------------------------------------------------------------------
    // When the exhibit is refreshed, the waypoints should query for new
    // records and update the list.
    // --------------------------------------------------------------------

    Neatline.vent.trigger('refresh');

    WP.respondWaypoints200(WP.json.RecordLoading.records.changed);
    var rows = WP.getRows();

    // Show list updated titles.
    expect($(rows[0])).toHaveText('title3');
    expect($(rows[1])).toHaveText('title2');
    expect($(rows[2])).toHaveText('title1');

  });


});
