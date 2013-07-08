<?php

/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4 cc=76; */

/**
 * @package     omeka
 * @subpackage  neatline-Waypoints
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

class FixturesTest_SharedHtml extends NeatlineWaypoints_Case_Default
{


    protected $_isAdminTest = false;


    /**
     * Create a exhibit with Waypoints enabled.
     */
    public function setUp()
    {

        parent::setUp();

        $this->exhibit = $this->_exhibit();
        $this->exhibit->spatial_layer = 'OpenStreetMap';
        $this->exhibit->widgets = 'Waypoints';
        $this->exhibit->save();

    }


    public function testNeatlinePartial()
    {
        $this->_writeExhibitMarkupFixture(
            $this->exhibit, 'SharedHtml.exhibit.html'
        );
    }


    public function testEditorPartial()
    {
        $this->_writeEditorMarkupFixture(
            $this->exhibit, 'SharedHtml.editor.html'
        );
    }


}