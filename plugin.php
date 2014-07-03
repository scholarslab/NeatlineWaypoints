<?php

/**
 * @package     omeka
 * @subpackage  neatline-Waypoints
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */


if (!defined('NL_WAYPOINTS_DIR')) {
    define('NL_WAYPOINTS_DIR', dirname(__FILE__));
}

require_once NL_WAYPOINTS_DIR . '/NeatlineWaypointsPlugin.php';
$waypoints = new NeatlineWaypointsPlugin();
$waypoints->setUp();
