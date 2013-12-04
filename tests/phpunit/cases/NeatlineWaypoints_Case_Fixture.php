<?php

/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4 cc=80; */

/**
 * @package     omeka
 * @subpackage  neatline-Waypoints
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */


class NeatlineWaypoints_Case_Fixture extends NeatlineWaypoints_Case_Default
{


    protected $_isAdminTest = false;


    /**
     * Create exhibit, set `exhibit_id` and `order` GET parameters.
     */
    public function setUp()
    {

        parent::setUp();

        // Create a mock exhibit.
        $this->exhibit = $this->_exhibit();

        // Set default parameters.
        $this->request->setQuery(array(
            'exhibit_id'    => $this->exhibit->id,
            'order'         => 'weight'
        ));

    }


    /**
     * Get the Jasmine fixtures directory.
     *
     * @return string The directory.
     */
    protected function _getFixturesPath()
    {
        return NL_WAYPOINTS_DIR.'/tests/jasmine/fixtures/';
    }


}
