<?php
/*
Plugin Name:  ACF Local JSON
Plugin URI:   https://www.advancedcustomfields.com/resources/local-json/
Description:  save ACF to json file as they are created
Version:      0.0.1
Author:       boris
Author URI:   https://boris.rip
License:      MIT License
*/

function my_acf_json_save_point( $path ) {
    // update path
    //$path = get_stylesheet_directory() . '/my-custom-folder';
    $path = dirname(__FILE__) . '/acf-json';
    // return
    return $path;
}
add_filter('acf/settings/save_json', 'my_acf_json_save_point');