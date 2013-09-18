<?php

/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4 cc=80; */

/**
 * @package     omeka
 * @subpackage  neatline-Waypoints
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

class NeatlineWaypoints_OrderController
    extends Omeka_Controller_AbstractActionController
{


    /**
     * Disable view rendering.
     */
    public function init()
    {
        $this->records = $this->_helper->db->getTable('NeatlineRecord');
        $this->_helper->viewRenderer->setNoRender(true);
    }


    /**
     * Save a record ordering.
     */
    public function indexAction()
    {

        // Decode the `id` ordering.
        $order = Zend_Json::decode($this->getRequest()->getRawBody());

        // Update the record weights.
        foreach ($order as $i => $id) {
            $record = $this->records->find($id);
            $record->weight = $i;
            $record->save();
        }

        // Return an empty JSON object.
        echo Zend_Json::encode(array());

    }


}
