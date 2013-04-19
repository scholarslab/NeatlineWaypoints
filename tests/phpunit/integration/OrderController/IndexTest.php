<?php

/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4 cc=76; */

/**
 * @package     omeka
 * @subpackage  neatline-Waypoints
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

class OrderControllerTest_Index extends NeatlineWaypoints_TestCase
{


    /**
     * INDEX should update record weights.
     */
    public function testBaseMarkup()
    {

        $exhibit = $this->__exhibit();
        $record1 = $this->__record($exhibit);
        $record2 = $this->__record($exhibit);
        $record3 = $this->__record($exhibit);

        $this->request->setMethod('POST')->setPost(array(
            'order' => array(
                $record1->id,
                $record2->id,
                $record3->id
            )
        ));

        $this->dispatch('neatline-waypoints');
        $record1 = $this->reload($record1);
        $record2 = $this->reload($record2);
        $record3 = $this->reload($record3);

        $this->assertEquals($record1->weight, 0);
        $this->assertEquals($record2->weight, 1);
        $this->assertEquals($record3->weight, 2);

    }


}
