<?php

/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4 cc=80; */

/**
 * @package     omeka
 * @subpackage  neatline-Waypoints
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */


class NeatlineWaypoints_Case_Default extends Neatline_Case_Default
{


    /**
     * Bootstrap the plugin.
     */
    public function setUp()
    {

        parent::setUp();

        // Install NeatlineWaypoints.
        $this->helper->setUp('NeatlineWaypoints');

        // Register script paths.
        get_view()->setScriptPath(NL_WAYPOINTS_DIR.'/views/shared');
        get_view()->addScriptPath(NL_DIR.'/views/shared');

    }


}
