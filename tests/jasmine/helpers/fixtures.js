
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */

/**
 * @package     omeka
 * @subpackage  neatline-Waypoints
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */


var WP = (function(WP) {


  /**
   * Read JSON fixtures.
   */
  WP.loadJsonFixtures = function() {

    this.json = {

      RecordLoading: {
        records: {
          regular:  readFixtures('RecordLoading.records.regular.json'),
          changed:  readFixtures('RecordLoading.records.changed.json')
        }
      },

      OutgoingEvents: {
        records:    readFixtures('OutgoingEvents.records.json')
      },

      Sorting: {
        records:    readFixtures('Sorting.records.json')
      }

    };

  };


  return WP;


})(WP || {});
