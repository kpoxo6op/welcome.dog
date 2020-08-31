<?php

add_action( 'init', function() {
  register_extended_post_type( 'dogplace', [
    'supports' => [
      'title',
      'editor',
      'author',
      'thumbnail',
      'excerpt',
      'comments',
    ],
    'taxonomies'   => array( 'dogplace-type'),
    'show_in_rest' => true,
  ]);

  register_extended_taxonomy( 'dogplace-type', 'dogplace', [
    'meta_box'     => 'radio',
    'show_in_rest' => true,
  ]);

});


//https://wordpress.org/support/topic/remove-duplicate-custom-taxonomy/#post-13171928
// add_action('add_meta_boxes', function() {
//    global $wp_meta_boxes;
//    var_dump( $wp_meta_boxes );
// }, 9999 );