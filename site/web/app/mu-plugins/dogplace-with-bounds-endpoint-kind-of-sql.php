<?php
/*
Plugin Name:  Return dogplaces within bounds
Plugin URI:   https://www.advancedcustomfields.com/resources/query-posts-custom-fields/
Description:  Trying yo use sql-like syntax here. Return dogplaces within rectangular area defined by South-East and North-West coordinates
Version:      0.0.1
Author:       boris
Author URI:   https://boris.rip/
License:      MIT License
*/

add_action( 'rest_api_init', function () {
  //TODO: only accept exact match sw=[optional -][required 1-3digits][optional , together with 20 digits]
    register_rest_route( 'wdog/v2', '/dogplaces',
    [
      'args' => [
        'sw' => [
          'default' => ',',
          'required' => false,
        ],
        'ne' => [
          'default' => ',',
          'required' => false,
        ],
      ],
      'callback' => 'get_dogplaces_within_bounds_sql_like',
      'methods' => 'GET',
    ]);
} );

function get_dogplaces_within_bounds_sql_like( WP_REST_Request $request ) {
  $sw_coords = array_map('floatval', explode(',', $request['sw']));
  $ne_coords = array_map('floatval', explode(',', $request['ne']));
  
  $dogplace_types = [6,16,3,4,5];
  $args = array(
    'numberposts'	=> -1,
    'post_type'		=> 'dogplace',
    'tax_query' => array(
        array(
            'taxonomy' => 'dogplace-type',
            'field'    => 'term_id',
            'terms'    => $dogplace_types,
        ),
    ),
  );
  
  $the_query = new WP_Query( $args );

  if( $the_query->have_posts() ) {
    while ( $the_query->have_posts() ) {
      $the_query->the_post();
      $location     = get_field('dogplace_map');
      $return_data[]['location'] = esc_attr($location['address']);

    }
  } else {
    return 'no dogplaces found';
  }
  wp_reset_query();
  return $return_data;
}