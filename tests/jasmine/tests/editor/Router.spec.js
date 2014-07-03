
/**
 * @package     omeka
 * @subpackage  neatline
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

describe('Editor | Apply Routes', function() {


  var elements;


  beforeEach(function() {

    WP.loadEditor();

    elements = {
      waypoints: NL.v.exhibit.$('li[data-slug="waypoints"]')
    };

  });


  it('#waypoints', function() {

    NL.navigate('waypoints');

    // Tabs and waypoints form should be visible.
    expect(NL.v.editor.__ui.editor).toContainHtml(NL.v.exhibit.$el);
    expect(NL.v.editor.__ui.editor).toContainHtml(WP.v.editor.$el);

    // "Waypoints" tab should be active.
    expect(elements.waypoints).toHaveClass('active');

  });


});
