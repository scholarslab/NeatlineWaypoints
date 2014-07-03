<?php

/**
 * @package     omeka
 * @subpackage  neatline-Waypoints
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

class OrderControllerTest_Index extends NeatlineWaypoints_Case_Default
{


    /**
     * INDEX should update record weights and return an empty response.
     */
    public function testBaseMarkup()
    {

        $exhibit = $this->_exhibit();
        $record1 = $this->_record($exhibit);
        $record2 = $this->_record($exhibit);
        $record3 = $this->_record($exhibit);

        $this->request->setMethod('POST')->setRawBody(
          Zend_Json::encode(array(
            $record1->id,
            $record2->id,
            $record3->id
        )));

        $this->dispatch('neatline-waypoints');
        $record1 = $this->_reload($record1);
        $record2 = $this->_reload($record2);
        $record3 = $this->_reload($record3);

        // Should set record weights.
        $this->assertEquals($record1->weight, 0);
        $this->assertEquals($record2->weight, 1);
        $this->assertEquals($record3->weight, 2);

        // Should return empty response.
        $this->assertEquals($this->_getResponseArray(), array());

    }


}
