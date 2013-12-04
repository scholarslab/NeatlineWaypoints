<?php

/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4 cc=80; */

/**
 * @package     omeka
 * @subpackage  neatline-Waypoints
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */


// Load Neatline testing bootstrap.
require_once '../../Neatline/tests/phpunit/bootstrap.php';

// Set plugin path.
define('NL_WAYPOINTS_DIR', PLUGIN_DIR.'/NeatlineWaypoints');

// Load test cases.
require_once 'cases/NeatlineWaypoints_Case_Default.php';
require_once 'cases/NeatlineWaypoints_Case_Fixture.php';
