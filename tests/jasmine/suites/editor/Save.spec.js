
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */

/**
 * @package     omeka
 * @subpackage  neatline-Waypoints
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

describe('Waypoints Save', function() {


  var el;


  beforeEach(function() {

    WP.loadEditor();
    WP.showWaypoints(WP.json.SortingForm.records);

    el = {
      save: WP.vw.WPEDIT.$('a[name="save"]')
    };

  });


  it('should issue POST request when "Save" is clicked', function() {

    // --------------------------------------------------------------------
    // When the "Save" button is clicked, a POST request should be issued
    // to the waypoints order API with the new record order.
    // --------------------------------------------------------------------

    // Click on "Save".
    el.save.trigger('click');

    // Route should be waypoints API, method POST.
    NL.assertLastRequestRoute(Neatline.global.waypoints_api);
    NL.assertLastRequestMethod('POST');

    var order = NL.getLastRequestParams();
    var rows  = WP.getEditorRows();

    // Should emit row `data-id` ordering.
    expect(order[0]).toEqual($(rows[0]).attr('data-id'));
    expect(order[1]).toEqual($(rows[1]).attr('data-id'));
    expect(order[2]).toEqual($(rows[2]).attr('data-id'));

  });


  it('should flash notification when save succeeds', function() {

    // --------------------------------------------------------------------
    // When the "Save" button is clicked and the request is successful, a
    // success notification should be displayed.
    // --------------------------------------------------------------------

    spyOn(toastr, 'info');

    // Click on "Save".
    el.save.trigger('click');
    NL.respondLast200('');

    // Should flash success.
    expect(toastr.info).toHaveBeenCalledWith(
      WP_STRINGS.order.save.success
    );

  });


  it('should flash notification when save fails', function() {

    // --------------------------------------------------------------------
    // When the "Save" button is clicked and the request fails, a failure
    // notification should be displayed.
    // --------------------------------------------------------------------

    spyOn(toastr, 'error');

    // Click on "Save".
    el.save.trigger('click');
    NL.respondLast500();

    // Should flash error.
    expect(toastr.error).toHaveBeenCalledWith(
      WP_STRINGS.order.save.error
    );

  });


  it('should refresh the exhibit when save succeeds', function() {

    // --------------------------------------------------------------------
    // When the "Save" button is clicked and the request succeeds, the
    // exhibit should be refreshed to manifest the new ordering.
    // --------------------------------------------------------------------

    spyOn(Neatline.vent, 'trigger').andCallThrough();

    // Click on "Save".
    el.save.trigger('click');
    NL.respondLast200('');

    // Should refresh the exhibit.
    expect(Neatline.vent.trigger).toHaveBeenCalledWith('refresh');

  });


});
