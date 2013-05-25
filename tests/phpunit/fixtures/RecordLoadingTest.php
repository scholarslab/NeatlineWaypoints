<?php

/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4 cc=76; */

/**
 * @package     omeka
 * @subpackage  neatline-Waypoints
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

class FixturesTest_RecordLoading extends NeatlineWaypoints_Case_Fixture
{


    /**
     * `RecordLoading.records.regular.json`
     * `RecordLoading.records.changed.json`
     */
    public function testRecordLoading()
    {

        $record1 = $this->__record($this->exhibit);
        $record2 = $this->__record($this->exhibit);
        $record3 = $this->__record($this->exhibit);

        $record1->title = 'title1';
        $record2->title = 'title2';
        $record3->title = 'title3';
        $record1->weight = 1;
        $record2->weight = 2;
        $record3->weight = 3;

        $record1->save();
        $record2->save();
        $record3->save();

        $this->writeFixtureFromRoute('neatline/records',
            'RecordLoading.records.regular.json'
        );

        $record1->weight = 3;
        $record2->weight = 2;
        $record3->weight = 1;

        $record1->save();
        $record2->save();
        $record3->save();

        $this->resetResponse();
        $this->writeFixtureFromRoute('neatline/records',
            'RecordLoading.records.changed.json'
        );

    }


    /**
     * `RecordLoading.records.empty.json`
     */
    public function testEmpty()
    {
        $this->writeFixtureFromRoute('neatline/records',
            'RecordLoading.records.empty.json'
        );
    }


}
