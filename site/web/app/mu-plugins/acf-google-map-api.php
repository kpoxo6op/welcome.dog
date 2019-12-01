<?php
/*
Plugin Name:  Google maps API
Plugin URI:   https://www.advancedcustomfields.com/resources/google-map/
Description:  register my Google API key
Version:      0.0.1
Author:       boris
Author URI:   https://boris.rip
License:      MIT License
*/

function my_acf_google_map_api( $api ){
    $api['key'] = 'AIzaSyCkY9AU1X_KFg6YoBa-OhBvOquFj9HpE9g';
    return $api;
}
add_filter('acf/fields/google_map/api', 'my_acf_google_map_api');
