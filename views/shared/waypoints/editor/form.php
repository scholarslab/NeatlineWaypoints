<?php

/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=80; */

/**
 * @package     omeka
 * @subpackage  neatline-Waypoints
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

?>

<script id="waypoints-form-template" type="text/templates">

  <div class="control-group">

    <label><?php echo __('Edit Waypoint Order'); ?></label>
    <div class="controls">
      <div class="inline-inputs">
        <div class="sort"></div>
      </div>
    </div>

  </div>

  <?php echo common('neatline/save'); ?>

</script>
