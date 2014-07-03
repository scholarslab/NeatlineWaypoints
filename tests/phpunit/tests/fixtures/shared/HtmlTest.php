<?php

/**
 * @package     omeka
 * @subpackage  neatline-Waypoints
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

class FixturesTest_SharedHtml extends NeatlineWaypoints_Case_Fixture
{


    /**
     * Create a exhibit with Waypoints enabled.
     */
    public function setUp()
    {

        parent::setUp();

        $this->exhibit->widgets = 'Waypoints';
        $this->exhibit->spatial_layer = 'OpenStreetMap';
        $this->exhibit->save();

    }


    public function testNeatlinePartial()
    {
        $this->_writeExhibitMarkupFixture($this->exhibit,
            'SharedHtml.exhibit.html'
        );
    }


    public function testEditorPartial()
    {
        $this->_writeEditorMarkupFixture($this->exhibit,
            'SharedHtml.editor.html'
        );
    }


}
