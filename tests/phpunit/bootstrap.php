<?php

/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4 cc=76; */

/**
 * PHPUnit runner.
 *
 * @package     omeka
 * @subpackage  neatline
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */


// Define path variables.
define('NL_ITEM_TRAY_DIR', dirname(dirname(dirname(__FILE__))));
define('OMEKA_DIR', dirname(dirname(NL_ITEM_TRAY_DIR)));
define('NL_DIR', dirname((NL_ITEM_TRAY_DIR)) . '/Neatline');
define('NL_TEST_DIR', NL_DIR . '/tests/phpunit');

// Bootstrap Omeka, load plugin managers.
require_once OMEKA_DIR . '/application/tests/bootstrap.php';
require_once NL_ITEM_TRAY_DIR . '/NeatlineItemTrayPlugin.php';
require_once NL_DIR . '/NeatlinePlugin.php';

// Load abstract test cases.
require_once NL_TEST_DIR . '/cases/Neatline_AbstractTestCase.php';
require_once NL_TEST_DIR . '/cases/Neatline_TestCase.php';
require_once 'cases/NeatlineItemTray_TestCase.php';
require_once 'cases/Neatline_RecordsFixtureCase.php';
