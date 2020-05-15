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
		array( 'post','dogplace' ),
		'wdog_meta',
		array(
			'get_callback' => 'get_wdogp_meta_fields',
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
function get_wdogp_meta_fields( $post_object, $field_name, $request ) {

	// make additional fields available in the response using an associative array.
	$additional_post_data = array();

	$post_id = $post_object['id']; // get the post id.
	$terms = get_the_terms( $post_id, 'dogplace-type' );
	$term_names = array();
	if ( !empty($terms) ) {
    foreach ($terms as $wdog_term) {
      $wdog_term_name = $wdog_term->name;
      array_push( $term_names, $wdog_term_name );
	  }
  } else {
			array_push( $term_names, 'unknown' );
	}
	$title = $post_object['title']['rendered'];
	$link = $post_object['link'];

	// add categories, custom excerpt, featured image to the api response.
	$img_id  = get_post_thumbnail_id( $post_id );
	$img_alt = get_post_meta( $img_id,'_wp_attachment_image_alt', true );
	$img_url = get_the_post_thumbnail_url($post_id, 'full');
	$term = current($term_names);
	$additional_post_data = array(
		'custom_excerpt' => wp_trim_words(
			$post_object['excerpt']['rendered'],
			25,
			' &hellip;'
		),
		'wdog_term'  => $term    ?: 'Unknown dog place type',
		'wdog_title' => $title   ?: 'No title',
		'wdog_link'  => $link    ?: '#',
		'img_alt'    => $img_alt ?: 'Dog place image',
		// fallbck in case https://wordpress.org/plugins/default-featured-image/ fails
		'img_url'    => $img_url ?: 'https://i.imgur.com/2D8GXzj.jpg'
	);

	// return data to the get_callback.
	// this data will be made available in the key "vue_meta".
	return $additional_post_data;
}

//https://developer.wordpress.org/reference/hooks/rest_api_init/
add_action('rest_api_init', 'extend_rest_api');
