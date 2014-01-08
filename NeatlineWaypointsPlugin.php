<?php

/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4 cc=80; */

/**
 * @package     omeka
 * @subpackage  neatline-Waypoints
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */


class NeatlineWaypointsPlugin extends Omeka_Plugin_AbstractPlugin
{


    const NAME  = 'Waypoints';
    const ID    = 'Waypoints';


    protected $_hooks = array(
        'define_routes',
        'neatline_public_templates',
        'neatline_editor_templates',
        'neatline_public_static',
        'neatline_editor_static'
    );


    protected $_filters = array(
        'neatline_exhibit_widgets',
        'neatline_record_widgets',
        'neatline_globals',
        'neatline_exhibit_tabs'
    );


    /**
     * Register routes.
     *
     * @param array $args Zend_Config instance under `router` key.
     */
    public function hookDefineRoutes($args)
    {
        $args['router']->addConfig(new Zend_Config_Ini(
            NL_WAYPOINTS_DIR . '/routes.ini', 'routes')
        );
    }


    /**
     * Queue public templates.
     *
     * @param array $args Array of arguments, with `exhibit`.
     */
    public function hookNeatlinePublicTemplates($args)
    {
        if ($args['exhibit']->hasWidget(self::ID)) {
            echo get_view()->partial('waypoints/public/list.php');
        }
    }


    /**
     * Queue editor templates.
     *
     * @param array $args Array of arguments, with `exhibit`.
     */
    public function hookNeatlineEditorTemplates($args)
    {
        if ($args['exhibit']->hasWidget(self::ID)) {
            echo get_view()->partial('waypoints/editor/form.php');
            echo get_view()->partial('waypoints/editor/list.php');
        }
    }


    /**
     * Queue public payloads.
     *
     * @param array $args Array of arguments, with `exhibit`.
     */
    public function hookNeatlinePublicStatic($args)
    {
        if ($args['exhibit']->hasWidget(self::ID)) {
            queue_css_file('payloads/waypoints-public');
            queue_js_file('payloads/waypoints-public');
        }
    }


    /**
     * Queue editor payloads.
     *
     * @param array $args Array of arguments, with `exhibit`.
     */
    public function hookNeatlineEditorStatic($args)
    {
        if ($args['exhibit']->hasWidget(self::ID)) {
            queue_css_file('payloads/waypoints-editor');
            queue_js_file('payloads/waypoints-editor');
        }
    }


    /**
     * Register the exhibit widget.
     *
     * @param array $widgets Widgets, <NAME> => <ID>.
     * @return array The modified array.
     */
    public function filterNeatlineExhibitWidgets($widgets)
    {
        return array_merge($widgets, array(self::NAME => self::ID));
    }


    /**
     * Register the record widget.
     *
     * @param array $widgets Widgets, <NAME> => <ID>.
     * @return array The modified array.
     */
    public function filterNeatlineRecordWidgets($widgets)
    {
        return array_merge($widgets, array(self::NAME => self::ID));
    }


    /**
     * Register the exhibit widget tab.
     *
     * @param array $tabs Tabs, <LABEL> => <ID>.
     * @return array The modified array.
     */
    public function filterNeatlineExhibitTabs($tabs, $args)
    {
        if ($args['exhibit']->hasWidget(self::ID)) {
            $tabs[self::NAME] = 'waypoints';
        }
        return $tabs;
    }


    /**
     * Register ordering API endpoint on `Neatline.g`.
     *
     * @param array $globals The array of global properties.
     * @param array $args Array of arguments, with `exhibit`.
     * @return array The modified array.
     */
    public function filterNeatlineGlobals($globals, $args)
    {
        return array_merge($globals, array('waypoints' => array(
            'strings' => nl_getStrings(NL_WAYPOINTS_DIR.'/strings.json'),
            'order_api' => url('neatline-waypoints')
        )));
    }


}
