<?php

add_action( 'init', function() {
  register_extended_post_type( 'dogplace', [
  ]);

  register_extended_taxonomy( 'dogplace-type', 'dogplace', [
    'meta_box' => 'radio',
  ]);
});