<?php
/*
Plugin Name:  Extend REST API
Plugin URI:   https://developer.wordpress.org/rest-api/extending-the-rest-api/modifying-responses/
Description:  Add feautured image and other field to my custom post type dogplace
Version:      0.0.1
Author:       boris
Author URI:   https://boris.rip
License:      MIT License
*/

function extend_rest_api() {
	register_rest_field(
		array( 'post','dogplace' ), // post types.
		'wdog_meta', // name of the new key.
		array(
			'get_callback' => 'wdog_get_post_meta_fields',
			'update_callback' => null,
			'schema' => null,
		)
	);
}

/**
 * GET callback for the "wdog_meta" field defined above.
 *
 * @param array $post_object Details of the current post.
 * @param string $field_name Field Name set in register_rest_field().
 * @param WP_REST_Request $request Current request.
 *
 * @return mixed
 */
function wdog_get_post_meta_fields( $post_object, $field_name, $request ) {

	// make additional fields available in the response using an associative array.
	$additional_post_data = array();

	$post_id = $post_object['id']; // get the post id.
	$wdog_terms = get_the_terms( $post_id, 'dogplace-type' );
	$wdog_term_names = array();
	if ( !empty($wdog_terms) ) {
    foreach ($wdog_terms as $wdog_term) {
      $wdog_term_name = $wdog_term->name;
      array_push( $wdog_term_names, $wdog_term_name );
	  }
  } else {
			array_push( $wdog_term_names, 'unknown' );
	}
	$wdog_post_title = $post_object['title']['rendered'];
	$wdog_post_link = $post_object['link'];

	// add categories, custom excerpt, featured image to the api response.
	$img_id  = get_post_thumbnail_id( $post_id );
	$img_alt = get_post_meta( $img_id,'_wp_attachment_image_alt', true );
	$additional_post_data = array(
		'custom_excerpt' => wp_trim_words(
			$post_object['excerpt']['rendered'],
			25,
			' &hellip;'
		),
		'wdog_term'  => current($wdog_term_names),
		'wdog_title' => $wdog_post_title,
		'wdog_link'  => $wdog_post_link,
		'featuredmedia_alt' => get_post_meta(
			$img_id,
			'_wp_attachment_image_alt',
			true
		),
		'featuredmedia_url' => get_the_post_thumbnail_url(
			$post_id,
			'full'
		)
	);

	// return data to the get_callback.
	// this data will be made available in the key "vue_meta".
	return $additional_post_data;
}

//https://developer.wordpress.org/reference/hooks/rest_api_init/
add_action('rest_api_init', 'extend_rest_api');
