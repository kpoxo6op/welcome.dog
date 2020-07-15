<?php
/*
Plugin Name:  Custom search form
Plugin URI:   https://discourse.roots.io/t/custom-search-form/9079/11
Description:  use custom wordpress search form
Version:      1.0.0
Author:       Roots
Author URI:   https://roots.io/
License:      MIT License
*/

add_filter('get_search_form', function () {
  return \App\template( 'partials.searchform' );
});