<?php
/*
Plugin Name:  Save spacial data on save
Plugin URI:   https://support.advancedcustomfields.com/forums/topic/query-posts-by-custom-field-google-map/
Description:  Save spacial data on save
Version:      0.0.1
Author:       boris
Author URI:   https://boris.rip
License:      MIT License
*/

//only fires at posts with attached acf

add_action('acf/save_post', 'my_acf_save_post', 5);
function my_acf_save_post( $post_id ) {
  $post_type = get_post_type( $post_id );
  if ($post_type === 'dogplace') {
    $value = get_field('dogplace_map', $post_id, false);
    if ($value) {
      update_post_meta($post_id, 'lat', $value['lat']);
      update_post_meta($post_id, 'lng', $value['lng']);

      $lat = get_post_meta( $post_id, 'lat', true );
      $lng = get_post_meta( $post_id, 'lng', true );

      $data = array(
        'ID'           => $post_id,
        'post_content' => 'coords: '.$lat.', '.$lng,
      );

      wp_update_post( $data );

    }
  }
}