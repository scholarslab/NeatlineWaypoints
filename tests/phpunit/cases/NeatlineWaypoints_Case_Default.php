<?php

/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4 cc=76; */

/**
 * @package     omeka
 * @subpackage  neatline-Waypoints
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */


class NeatlineWaypoints_Case_Default extends Neatline_Case_Abstract
{


    /**
     * Bootstrap the plugin.
     */
    public function setUp()
    {

        parent::setUp();

        // Authenticate and set the current user.
        $this->user = $this->db->getTable('User')->find(1);
        $this->_authenticateUser($this->user);

        // Install Neatline and NeatlineWaypoints.
        $pluginHelper = new Omeka_Test_Helper_Plugin;
        $pluginHelper->setUp('Neatline');
        $pluginHelper->setUp('NeatlineWaypoints');

        // Register script paths.
        get_view()->setScriptPath(NL_WAYPOINTS_DIR . '/views/shared');
        get_view()->addScriptPath(NL_DIR . '/views/shared');

    }


    /**
     * Get the Jasmine fixtures directory.
     *
     * @return string The directory.
     */
    protected function getFixturesPath()
    {
        return NL_WAYPOINTS_DIR . '/tests/jasmine/fixtures/';
    }


}
