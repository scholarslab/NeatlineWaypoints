<?php

/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4 cc=76; */

/**
 * Plugin manager class.
 *
 * @package     omeka
 * @subpackage  neatline-ItemTray
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */


class NeatlineItemTrayPlugin extends Omeka_Plugin_AbstractPlugin
{


    const NAME  = 'Item Tray';
    const ID    = 'ItemTray';
    const SLUG  = 'item-tray';


    protected $_hooks = array(
        'neatline_public_underscore',
        'neatline_editor_underscore',
        'neatline_public_static',
        'neatline_editor_static'
    );


    protected $_filters = array(
        'neatline_exhibit_tabs',
        'neatline_exhibit_widgets',
        'neatline_record_widgets'
    );


    /**
     * Queue public templates.
     *
     * @param array $args Array of arguments, with `exhibit`.
     */
    public function hookNeatlinePublicUnderscore($args)
    {
        if ($args['exhibit']->hasWidget('ItemTray')) {
            echo get_view()->partial('tray/underscore/public/list.php');
        }
    }


    /**
     * Queue editor templates.
     *
     * @param array $args Array of arguments, with `exhibit`.
     */
    public function hookNeatlineEditorUnderscore($args)
    {
        if ($args['exhibit']->hasWidget('ItemTray')) {
            echo get_view()->partial('tray/underscore/editor/form.php');
            echo get_view()->partial('tray/underscore/editor/list.php');
        }
    }


    /**
     * Queue public payloads.
     *
     * @param array $args Array of arguments, with `exhibit`.
     */
    public function hookNeatlinePublicStatic($args)
    {
        if ($args['exhibit']->hasWidget('ItemTray')) {
            queue_css_file('payloads/tray-public');
            queue_js_file('payloads/tray-public');
        }
    }


    /**
     * Queue editor payloads.
     *
     * @param array $args Array of arguments, with `exhibit`.
     */
    public function hookNeatlineEditorStatic($args)
    {
        if ($args['exhibit']->hasWidget('ItemTray')) {
            queue_css_file('payloads/tray-editor');
            queue_js_file('payloads/tray-editor');
        }
    }


    /**
     * Register the exhibit widget tab.
     *
     * @param array $tabs Tabs, <LABEL> => <SLUG>.
     * @return array The array, with "Item Tray".
     */
    public function filterNeatlineExhibitTabs($tabs, $args)
    {
        if ($args['exhibit']->hasWidget('ItemTray')) {
          return array_merge($tabs, array(
              self::NAME => self::SLUG
          ));
        }
    }


    /**
     * Register the exhibit widget.
     *
     * @param array $widgets Widgets, <NAME> => <ID>.
     * @return array The array, with "Item Tray".
     */
    public function filterNeatlineExhibitWidgets($widgets)
    {
        return array_merge($widgets, array(
            self::NAME => self::ID
        ));
    }


    /**
     * Register the record widget.
     *
     * @param array $widgets Widgets, <NAME> => <ID>.
     * @return array The array, with "Item Tray".
     */
    public function filterNeatlineRecordWidgets($widgets)
    {
        return array_merge($widgets, array(
            self::NAME => self::ID
        ));
    }


}
