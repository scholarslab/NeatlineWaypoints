
/**
 * @package     omeka
 * @subpackage  neatline-Waypoints
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

describe('Neatline | Record Listing', function() {


  var fixtures = {
    regular:  readFixtures('NeatlineList.regular.json'),
    changed:  readFixtures('NeatlineList.changed.json'),
    empty:    readFixtures('NeatlineList.empty.json')
  };


  beforeEach(function() {
    WP.loadNeatline();
    WP.respondWaypoints200(fixtures.regular);
  });


  it('should load records when the exhibit starts', function() {

    // ------------------------------------------------------------------------
    // When the exhibit starts, the waypoints should show listings for records
    // that arrive in the initial query.
    // ------------------------------------------------------------------------

    var rows = WP.getWidgetRows();

    // Show list titles.
    expect($(rows[0])).toHaveText('title1');
    expect($(rows[1])).toHaveText('title2');
    expect($(rows[2])).toHaveText('title3');

  });


  it('should reload records when the exhibit is refreshed', function() {

    // ------------------------------------------------------------------------
    // When the exhibit is refreshed, the waypoints should load new records
    // and update the list.
    // ------------------------------------------------------------------------

    Neatline.vent.trigger('refresh');
    WP.respondWaypoints200(fixtures.changed);
    var rows = WP.getWidgetRows();

    // Show list updated titles.
    expect($(rows[0])).toHaveText('title3');
    expect($(rows[1])).toHaveText('title2');
    expect($(rows[2])).toHaveText('title1');

  });


  it('should add `empty` class when collection is empty', function() {

    // ------------------------------------------------------------------------
    // When an empty collection is ingested, the `empty` class should be added
    // to the widget container.
    // ------------------------------------------------------------------------

    // Should add empty class.
    WP.refreshWidget(fixtures.empty);
    expect(WP.v.neatline.$el).toHaveClass('empty');

    // Should remove empty class.
    WP.refreshWidget(fixtures.regular);
    expect(WP.v.neatline.$el).not.toHaveClass('empty');

  });


});
