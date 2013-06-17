
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */

/**
 * @package     omeka
 * @subpackage  neatline
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

describe('Editor | Router', function() {


  var el;


  beforeEach(function() {

    WP.loadEditor();

    el = {
      waypoints: NL.vw.EXHIBIT.$('li[data-slug="waypoints"]')
    };

  });


  it('#waypoints', function() {

    NL.navigate('waypoints');

    // Tabs and waypoints form should be visible.
    expect(NL.vw.EDITOR.__ui.editor).toContain(NL.vw.EXHIBIT.$el);
    expect(NL.vw.EDITOR.__ui.editor).toContain(WP.vw.EDITOR.$el);

    // "Waypoints" tab should be active.
    expect(el.waypoints).toHaveClass('active');

  });


});
