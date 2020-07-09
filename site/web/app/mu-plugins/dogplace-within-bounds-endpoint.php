<?php
/*
Plugin Name:  Return dogplaces within bounds
Plugin URI:   https://developer.wordpress.org/rest-api/extending-the-rest-api/adding-custom-endpoints/
Description:  Return dogplaces within rectangular area defined by South-East and North-West coordinates
Version:      0.0.1
Author:       boris
Author URI:   https://boris.rip/
License:      MIT License
*/

/*
TODOs:
- decide what to do with invalid URL requests
+ make sw and ne params optional
+ accept dogplace-type parameter
*/

// Auckland rectangular boundaries
define("AKL_SW_BOUNDARY_LAT", -37.289350);
define("AKL_SW_BOUNDARY_LNG", 173.997302);

define("AKL_NE_BOUNDARY_LAT", -36.304059);
define("AKL_NE_BOUNDARY_LNG", 175.305529);

//sample places to check my function
define("AKL_LAT", -36.848461);
define("AKL_LNG", 174.763336);

define("RANGITOTO_LAT", -36.804199);
define("RANGITOTO_LNG", 174.852065);

define("WGN_LAT", -41.28664);
define("WGN_LNG", 174.77557);

define("RAR_LAT", -21.2333324);
define("RAR_LNG", -159.7833302);



add_action( 'rest_api_init', function () {
  //TODO: only accept exact match sw=[optional -][required 1-3digits][optional , together with 20 digits]
    register_rest_route( 'wdog/v1', '/dogplaces',
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
        'dogplace-type' => [
          'default' => '',
          'required' => false,
        ],
      ],
      'callback' => 'get_dogplaces_within_bounds',
      'methods' => 'GET',
    ]);
} );

function get_dogplaces_within_bounds( WP_REST_Request $request ) {
  /* BEGIN check if we get coordintates */
  $sw_coords = array_map('floatval', explode(',', urldecode($request['sw'])));
  $ne_coords = array_map('floatval', explode(',', urldecode($request['ne'])));
  $dogplace_types = $request['dogplace-type'];
  if ($dogplace_types == '') {
    $dogplace_types = get_terms(
      array( 'dogplace-type' ),
      array( 'fields' => 'ids' )
    );
  }

  if (!is_array($sw_coords)  ||
      empty($sw_coords)      ||
      count($sw_coords) != 2 ||
      !is_numeric($sw_coords[0]) ||
      !is_numeric($sw_coords[1]) ||
      in_array(0, $sw_coords)
  ) {
    unset($sw_coords);
  }

  if (!is_array($ne_coords)  ||
      empty($ne_coords)      ||
      count($ne_coords) != 2 ||
      !is_numeric($ne_coords[0]) ||
      !is_numeric($ne_coords[1]) ||
      in_array(0, $ne_coords)
  ) {
    unset($ne_coords);
  }

  if ( isset($sw_coords) && isset($ne_coords) ) {
    $geolimit = true;
  } else {
    $geolimit = false;
  }
  /* END check if we get coordintates */

  //TODO: what would happen when we have like 1mil places?
  $args = array(
    'numberposts' => -1,
    'post_type' => 'dogplace',
    //pagination?
    'tax_query' => array(
        array(
            'taxonomy' => 'dogplace-type',
            'field'    => 'term_id',
            'terms'    => ($dogplace_types),
        ),
    ),
  );
  //we grab all places from the DB. TODO only return places within bounds from the DB
  //also have a look at pagination
  $all_dogplaces = get_posts($args);
  
  $dogplaces = [];
  foreach($all_dogplaces as $post) {
    /* BEGIN attach wdog_meta to each post */
    $custom_excerpt = wp_trim_words(
      apply_filters('the_excerpt', $post->post_excerpt),
      25,
      ' &hellip;'
    );
    $terms = get_the_terms( $post->ID, 'dogplace-type' );
    $term_names = array();
    if ( !empty($terms) ) {
      foreach ($terms as $wdog_term) {
        $wdog_term_name = $wdog_term->name;
        array_push( $term_names, $wdog_term_name );
      }
    } else {
        array_push( $term_names, 'unknown' );
    }
    $term = current($term_names);

    $title = $post->post_title;

    $link = apply_filters('permalink', get_permalink($post));

    $img_id  = get_post_thumbnail_id( $post->ID );
    $img_alt = get_post_meta( $img_id,'_wp_attachment_image_alt', true );
    $img_url = get_the_post_thumbnail_url($post->ID, 'full');

    $additional_post_data = array(
      'custom_excerpt' => $custom_excerpt ?: '',
      'wdog_term'      => $term           ?: 'Unknown dog place type',
      'wdog_title'     => $title          ?: 'No title',
      'wdog_link'      => $link           ?: '#',
      'img_alt'        => $img_alt        ?: 'Dog place image',
      'img_url'        => $img_url        ?: 'https://i.imgur.com/2D8GXzj.jpg'
    );
    $post->{'wdog_meta'} = $additional_post_data;

    $acf = get_fields( $post->ID );
    $post->{'acf'} = $acf;
    /* END attach wdog_meta to each post */

    if ($geolimit) {
      //only return if place fits within map bounds
      $place_coords = array($acf['dogplace_map']['lat'], $acf['dogplace_map']['lng']);
      if ( is_place_within_bounds($place_coords, $sw_coords, $ne_coords) ) {
        $dogplaces[] = $post;
      }
    } else {
      $dogplaces[] = $post;
    }
  }

  return $dogplaces;
}

function is_place_within_bounds($placeLatLng, $swLatLng, $neLatLng) {
  $dp_lat = $placeLatLng[0];
  $dp_lng = $placeLatLng[1];

  $sw_lat = $swLatLng[0];
  $sw_lng = $swLatLng[1];

  $ne_lat = $neLatLng[0];
  $ne_lng = $neLatLng[1];

  if ($dp_lat >= $sw_lat && $dp_lat <= $ne_lat) {
    $lat_within_range = true;
  } else {
    $lat_within_range = false;
  }

  if ($dp_lng >= $sw_lng && $dp_lng <= $ne_lng) {
    $lng_within_range = true;
  } else {
    $lng_within_range = false;
  }

  return ($lat_within_range && $lng_within_range);
}


/*
  Examples:
  trademe
  https://www.trademe.co.nz/a/property/residential/sale/search?bof=viaqt6d6&latitude_max=-36.71307396253395&latitude_min=-36.8458906539457&longitude_max=175.1539773246926&longitude_min=175.00463192674337&rows=150
  domain co au
  https://www.domain.com.au/sale/?excludeunderoffer=1&startloc=-36.71501756132026%2C174.68587701176432&endloc=-37.16011585786423%2C175.56546990727213&displaymap=1
*/