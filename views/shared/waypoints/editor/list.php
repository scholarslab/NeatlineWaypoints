<?php

/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=80; */

/**
 * @package     omeka
 * @subpackage  neatline-Waypoints
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

?>

<script id="waypoints-editor-list-template" type="text/templates">

  <!-- Placeholder. -->
  <% if (records.length == 0) { %>
    <div class="alert alert-info">
      <%= Neatline.g.waypoints.strings.order.placeholders.empty %>
    </div>
  <% } %>

  <!-- Waypoints. -->
  <% records.each(function(r) { %>
    <div class="alert alert-info" data-id="<%= r.id %>">
      <%= r.get('title') %>
    </div>
  <% }); %>

</script>
