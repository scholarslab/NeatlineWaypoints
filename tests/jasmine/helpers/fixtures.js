
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */

/**
 * Fixture loading helpers.
 *
 * @package     omeka
 * @subpackage  neatline
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */


var _tray = (function(_tray) {


  /**
   * Read JSON fixtures.
   */
  _tray.loadJsonFixtures = function() {

    this.json = {

      RecordLoading: {
        records: {
          regular:  readFixtures('RecordLoading.records.regular.json'),
          empty:    readFixtures('RecordLoading.records.empty.json')
        }
      }

    };

  };


  return _tray;


})(_tray || {});
