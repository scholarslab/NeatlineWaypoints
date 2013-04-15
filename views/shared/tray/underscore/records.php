<?php

/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */

/**
 * Item tray record list.
 *
 * @package     omeka
 * @subpackage  neatline
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

?>

<script id="item-tray-records-template" type="text/templates">

  <ul>
    <% records.each(function(r) { %>
      <li data-id="<%= r.id %>"><%= r.get('title') %></li>
    <% }); %>
  </ul>

</script>
