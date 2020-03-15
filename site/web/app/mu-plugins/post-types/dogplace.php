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
    'taxonomies' => array( 'dogplace-type' ),
    'show_in_rest' => true,
  ]);

  register_extended_taxonomy( 'dogplace-type', 'dogplace', [
    'meta_box' => 'radio',
    'show_in_rest' => true,
  ]);
});