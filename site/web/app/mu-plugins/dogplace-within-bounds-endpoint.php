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

function get_dogplaces_within_bounds( WP_REST_Request $request ) {

  //sw and ne comes from the client as {{baseURL}}/wp-json/wdog/v1/dogplaces/sw/-37.029908,174.576413/ne/-36.718463,174.98634
  $sw_coords = explode(',', $request['sw']);
  $ne_coords = explode(',', $request['ne']);

  $Auckland   = array(AKL_LAT, AKL_LNG);
  $Wellington = array(WGN_LAT, WGN_LNG);
  $Rarotonga  = array(RAR_LAT, RAR_LNG);
  $Rangitoto  = array(RANGITOTO_LAT, RANGITOTO_LNG);

  $sample_dogplaces = array($Auckland, $Wellington, $Rarotonga, $Rangitoto);

  foreach($sample_dogplaces as $place) {
    if ( is_place_within_bounds($place, $sw_coords, $ne_coords) ) {
      $places_on_screen[] = $place;
    }
  }

  return $places_on_screen;
}

add_action( 'rest_api_init', function () {
  // string $namespace Required
  // string $route     Required
  // array  $args      Optional
  register_rest_route( 'wdog/v1', '/dogplaces/sw/(?P<sw>[a-z0-9 .\-,]+)/ne/(?P<ne>[a-z0-9 .\-,]+)', array(
    'methods' => 'GET',
    'callback' => 'get_dogplaces_within_bounds',
  ) );
} );

function is_place_within_bounds($placeLatLng = array(AKL_LAT, AKL_LNG), $swLatLng = array(AKL_SW_BOUNDARY_LAT, AKL_SW_BOUNDARY_LNG), $neLatLng = array(AKL_NE_BOUNDARY_LAT, AKL_NE_BOUNDARY_LNG)) {
  $dp_lat = $placeLatLng[0];
  $dp_lng = $placeLatLng[1];

  $sw_lat = $swLatLng[0];
  $sw_lng = $swLatLng[1];

  $ne_lat = $neLatLng[0];
  $ne_lng = $neLatLng[1];

  if ($dp_lat >= $sw_lat && $dp_lat <= $ne_lat) {
    $lat_within_range = true;
  }

  if ($dp_lng >= $sw_lng && $dp_lng <= $ne_lng) {
    $lng_within_range = true;
  }

  return ($lat_within_range && $lng_within_range);
}

/*
notes
(?P[a-z0-9 .\-]+) for longitude or latitude
*/

//The Following registers an api route with multiple parameters.
// add_action( 'rest_api_init', 'add_custom_users_api');
 
// function add_custom_users_api(){
//     register_rest_route( 'mmw/v1', '/users/
//                                     market=(?P<market>[a-zA-Z0-9-]+)/
//                                     lat=(?P<lat>[a-z0-9 .\-]+)/
//                                     long=(?P<long>[a-z0-9 .\-]+)', array(
//         'methods' => 'GET',
//         'callback' => 'get_custom_users_data',
//     ));
// }

// //Customize the callback to your liking
// function get_custom_users_data($data){
//     //get users by market
//     $users = mmw_get_custom_users();
//     foreach ($users as $key => $user) {
//         $market = $user['Market'];
//         $long = $user['long'];
//         $lat = $user['lat'];
 
//         if( intval($market) === intval(trim($data['market'])) ){
//             $result[] = array(
//                 'user_login' => $user->user_login,
//                 'avatar_url' => get_avatar_url($user->ID),
//                 'lat' => $lat,
//                 'long' => $long
//             );
//         }
//     }
//     return $result;
// }


  /*
                        ne_lat
                        ne_lng
                              
                              
       dogplace inside        
                              
                              
                              
                              
  sw_lat
  sw_lng

  */
