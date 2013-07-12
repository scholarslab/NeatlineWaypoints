<?php

/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4 cc=76; */

/**
 * @package     omeka
 * @subpackage  neatline-Waypoints
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

class FixturesTest_NeatlineList extends NeatlineWaypoints_Case_Fixture
{


    public function testRecordLoading()
    {

        $record1 = $this->_record($this->exhibit);
        $record2 = $this->_record($this->exhibit);
        $record3 = $this->_record($this->exhibit);

        $record1->title = 'title1';
        $record2->title = 'title2';
        $record3->title = 'title3';
        $record1->weight = 1;
        $record2->weight = 2;
        $record3->weight = 3;

        $record1->save();
        $record2->save();
        $record3->save();

        $this->_writeFixtureFromRoute('neatline/records',
            'NeatlineList.regular.json'
        );

        $record1->weight = 3;
        $record2->weight = 2;
        $record3->weight = 1;

        $record1->save();
        $record2->save();
        $record3->save();

        $this->resetResponse();
        $this->_writeFixtureFromRoute('neatline/records',
            'NeatlineList.changed.json'
        );

    }


    public function testEmpty()
    {
        $this->_writeFixtureFromRoute('neatline/records',
            'NeatlineList.empty.json'
        );
    }


}
